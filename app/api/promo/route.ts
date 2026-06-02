import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// ИСПРАВЛЕНИЕ: Создаем админский клиент, который обходит замок RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    const upperCode = code.trim().toUpperCase();

    // 1. Проверка на Админа
    if (upperCode === process.env.ADMIN_PASSWORD) {
      const cookieStore = await cookies();
     cookieStore.set('admin_token', process.env.ADMIN_PASSWORD as string, { httpOnly: true, path: '/' });
      return NextResponse.json({ status: 'admin' });
    }

    // 2. Проверка на безлимитные Мастер-промокоды
    const validPromos = (process.env.MASTER_PROMOS || "").split(',');
    if (validPromos.includes(upperCode)) {
      return NextResponse.json({ status: 'master' });
    }

    // 3. Ищем VIP-код клиента (ТЕПЕРЬ ИСПОЛЬЗУЕМ supabaseAdmin)
    const { data: vipPromo, error } = await supabaseAdmin
      .from('vip_promos')
      .select('*')
      .eq('code', upperCode)
      .single();

    if (error || !vipPromo) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ status: 'error', message: 'Қате промокод' }, { status: 400 });
    }

    // 4. Защита от халявщиков
    if (vipPromo.is_used) {
      return NextResponse.json({ status: 'used', data: vipPromo });
    }

    // 5. Если код свежий — обновляем его статус (ТЕПЕРЬ ИСПОЛЬЗУЕМ supabaseAdmin)
    await supabaseAdmin
      .from('vip_promos')
      .update({ is_used: true })
      .eq('code', upperCode);

    return NextResponse.json({ status: 'success', data: vipPromo });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ status: 'error', message: 'Сервер қатесі' }, { status: 500 });
  }
}