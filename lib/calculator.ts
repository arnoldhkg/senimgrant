import { SPECS } from "./data";
import type { Quota } from "@/types";

// Добавили 4-й аргумент: targetSpecCodes
export function calculateChance(score: number, subjects: string[], quota: Quota, targetSpecCodes?: string[]) {
  // 1. Ищем специальности по предметам
  let matches = SPECS.filter(spec => 
    spec.subjects.includes(subjects[0]) && spec.subjects.includes(subjects[1])
  );

  // 2. Если пользователь выбрал конкретные профессии в чекбоксах — фильтруем по ним
  if (targetSpecCodes && targetSpecCodes.length > 0) {
    matches = matches.filter(spec => targetSpecCodes.includes(spec.code));
  }

  if (matches.length === 0) {
    return {
      result: { pct: 0, title: "Мамандық таңдалмады", desc: "Есептеу үшін кем дегенде бір мамандықты таңдаңыз.", risk: 'high' as const },
      topSpecs: []
    };
  }

  const quotaBonus = quota === "rural" ? 5 : quota === "social" ? 3 : quota === "target" ? 2 : 0;

  const processed = matches.map(spec => {
    const adjustedTarget = Math.max(spec.min, spec.target - quotaBonus);
    let prob = 0;

    if (score < spec.min) {
      prob = 0;
    } else if (score >= adjustedTarget + 5) {
      prob = 99;
    } else if (score >= adjustedTarget) {
      prob = 85 + Math.floor(((score - adjustedTarget) / 5) * 14);
    } else if (score >= adjustedTarget - 5) {
      prob = 50 + Math.floor(((score - (adjustedTarget - 5)) / 5) * 34);
    } else if (score >= adjustedTarget - 15) {
      prob = 15 + Math.floor(((score - (adjustedTarget - 15)) / 10) * 34);
    } else {
      prob = Math.max(1, Math.floor((score / adjustedTarget) * 14));
    }

    return { ...spec, prob };
  });

  const sorted = processed.sort((a, b) => b.prob - a.prob);
  const bestProb = sorted.length > 0 ? sorted[0].prob : 0;
  
  let title, desc, risk: 'low' | 'mid' | 'high';

  if (bestProb >= 85) {
    title = "Жоғары мүмкіндік";
    desc = "Құттықтаймыз! Балыңыз таңдалған мамандықтарға түсуге жетеді.";
    risk = "low";
  } else if (bestProb >= 50) {
    title = "Орташа мүмкіндік";
    desc = "Мүмкіндік бар, бірақ бәсекелестікке байланысты. Қауіпсіздік үшін басқа да нұсқаларды қарастырыңыз.";
    risk = "mid";
  } else if (bestProb > 0) {
    title = "Тәуекел жоғары";
    desc = "Бұл баллмен таңдалған мамандықтарға түсу қиын.";
    risk = "high";
  } else {
    title = "Шекті балл жеткіліксіз";
    desc = "Балыңыз таңдалған мамандықтардың ресми шекті балынан төмен.";
    risk = "high";
  }

  return {
    result: { pct: bestProb, title, desc, risk },
    topSpecs: sorted 
  };
}