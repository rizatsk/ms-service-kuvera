export function getTTLUntilNextMorningStock(): number {
  const now = new Date();

  const day = now.getDay(); // 0 = Minggu, 6 = Sabtu
  const todayAt16 = new Date(now);
  todayAt16.setHours(16, 0, 0, 0);

  const tomorrowAt9 = new Date(now);
  tomorrowAt9.setDate(now.getDate() + 1);
  tomorrowAt9.setHours(9, 0, 0, 0);

  // Kalau hari Sabtu (6) atau Minggu (0)
  if (day === 6 || day === 0) {
    const diffTo9 = tomorrowAt9.getTime() - now.getTime();
    return Math.floor(diffTo9 / 1000); // TTL detik
  }

  // Untuk hari kerja (Senin–Jumat)
  if (now < todayAt16) {
    return 3;
  } else {
    // Sudah lewat jam 16:00 → TTL sampai besok jam 09:00
    const diffTo9 = tomorrowAt9.getTime() - now.getTime();
    return Math.floor(diffTo9 / 1000);
  }
};

export function getTTLUntilNextMorningGold(): number {
  const now = new Date();

  const tomorrowAt9 = new Date(now);
  tomorrowAt9.setDate(now.getDate() + 1);
  tomorrowAt9.setHours(9, 0, 0, 0);

  // Sudah lewat jam 16:00 → TTL sampai besok jam 09:00
  const diffTo9 = tomorrowAt9.getTime() - now.getTime();
  return Math.floor(diffTo9 / 1000);
}
