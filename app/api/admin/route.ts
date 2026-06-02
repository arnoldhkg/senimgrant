import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ИСПРАВЛЕНИЕ: Функция проверки теперь асинхронная (async/await)
const checkAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === process.env.ADMIN_PASSWORD;
};

export async function GET() {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Рұқсат жоқ' }, { status: 401 });

  const { data, error } = await supabaseAdmin.from('vip_promos').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Рұқсат жоқ' }, { status: 401 });

  const body = await request.json();
  const { error } = await supabaseAdmin.from('vip_promos').insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) return NextResponse.json({ error: 'Рұқсат жоқ' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const { error } = await supabaseAdmin.from('vip_promos').delete().eq('code', code);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}