/**
 * Day 2 "how many waiters?" simulation data.
 * Background process names = what the learner observed in pg_stat_activity on
 * PostgreSQL 18.6 with default settings (2026-11-22; io_method=worker, io_workers=3
 * checked in the lab). Short role notes are previews; each gets its own lesson later.
 */

export interface StaffMember {
  backendType: string;
  count: number;
  role: string;
  laterDay?: number;
}

export const waiterModel = {
  models:
    "pg_stat_activity'nin backend_type özetini: her açık bağlantı bir client backend, yanında hep çalışan arka plan ekibi.",
  simplifies:
    "Arka plan süreçlerinin listesi ve sayısı sürüme ve ayarlara göre değişir. Gerçek bağlantılar bellek de harcar; bunu 59. günde ölçeceğiz.",
};

export const MAX_SESSIONS = 6;

export const backgroundStaff: StaffMember[] = [
  { backendType: "autovacuum launcher", count: 1, role: "Temizlik ekibini görevlendirir: artık kullanılmayan eski satırları temizletir.", laterDay: 41 },
  { backendType: "background writer", count: 1, role: "Boş zamanlarda tezgâhtaki değişiklikleri depoya taşır, garsonların işini hafifletir.", laterDay: 33 },
  { backendType: "checkpointer", count: 1, role: "Belirli aralıklarla tüm değişiklikleri depoya kalıcı olarak yerleştirir.", laterDay: 35 },
  { backendType: "io worker", count: 3, role: "Depodan malzeme taşıyan yardımcılar (PostgreSQL 18).", laterDay: 33 },
  { backendType: "logical replication launcher", count: 1, role: "Başka bir şubeye kopya göndermek gerekirse ekibi başlatır. Bizim lab'da boşta bekler.", laterDay: 71 },
  { backendType: "walwriter", count: 1, role: "Her değişikliği önce kayıt defterine (WAL) yazan kâtip.", laterDay: 34 },
];
