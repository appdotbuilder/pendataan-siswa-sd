import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface DashboardStats {
    total_students: number;
    total_teachers: number;
    total_classes: number;
    male_students: number;
    female_students: number;
}

interface StudentByClass {
    class: string;
    count: number;
}

interface Props {
    stats: DashboardStats;
    students_by_class: StudentByClass[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, students_by_class }: Props) {
    const isAdmin = (window as unknown as { auth?: { user?: { role?: string } } }).auth?.user?.role === 'admin';

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">📊 Dashboard</h1>
                    <p className="text-gray-600 mt-2">
                        Ringkasan data siswa dan statistik sekolah
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-3xl">👥</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Siswa</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {stats.total_students.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-3xl">👨‍🏫</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Guru</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {stats.total_teachers.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-3xl">🏫</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Kelas</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {stats.total_classes.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="text-3xl">⚖️</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Rasio L:P</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {stats.male_students}:{stats.female_students}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Gender Distribution */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">👫 Distribusi Gender</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">👦</span>
                                    <span className="font-medium">Laki-laki</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full" 
                                            style={{
                                                width: `${(stats.male_students / stats.total_students) * 100}%`
                                            }}
                                        />
                                    </div>
                                    <span className="font-semibold text-blue-600">
                                        {stats.male_students}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-3">👧</span>
                                    <span className="font-medium">Perempuan</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-pink-600 h-2 rounded-full" 
                                            style={{
                                                width: `${(stats.female_students / stats.total_students) * 100}%`
                                            }}
                                        />
                                    </div>
                                    <span className="font-semibold text-pink-600">
                                        {stats.female_students}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>
                                    Persentase: {((stats.male_students / stats.total_students) * 100).toFixed(1)}% L, 
                                    {' '}{((stats.female_students / stats.total_students) * 100).toFixed(1)}% P
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Students by Class */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">📚 Siswa per Kelas</h3>
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {students_by_class.map((item) => (
                                <div key={item.class} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <span className="text-lg mr-3">🏫</span>
                                        <span className="font-medium">Kelas {item.class}</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <div className="w-24 bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-indigo-600 h-2 rounded-full" 
                                                style={{
                                                    width: `${Math.max((item.count / 30) * 100, 10)}%`
                                                }}
                                            />
                                        </div>
                                        <span className="font-semibold text-indigo-600 min-w-[2rem] text-right">
                                            {item.count}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {students_by_class.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <span className="text-4xl mb-2 block">📖</span>
                                Belum ada data kelas
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions for Admin */}
                {isAdmin && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">⚡ Aksi Cepat</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <a 
                                href="/students/create" 
                                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                            >
                                <span className="text-3xl mb-2">➕</span>
                                <span className="text-sm font-medium">Tambah Siswa</span>
                            </a>

                            <a 
                                href="/teachers/create" 
                                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
                            >
                                <span className="text-3xl mb-2">👨‍🏫</span>
                                <span className="text-sm font-medium">Tambah Guru</span>
                            </a>

                            <a 
                                href="/classes/create" 
                                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                            >
                                <span className="text-3xl mb-2">🏫</span>
                                <span className="text-sm font-medium">Buat Kelas</span>
                            </a>

                            <a 
                                href="/transfers/create" 
                                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                            >
                                <span className="text-3xl mb-2">🔄</span>
                                <span className="text-sm font-medium">Catat Mutasi</span>
                            </a>
                        </div>
                    </div>
                )}

                {/* Recent Activity or Tips for Teachers */}
                {!isAdmin && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                        <h3 className="text-lg font-semibold mb-4 text-indigo-800">
                            💡 Tips untuk Guru
                        </h3>
                        <div className="space-y-3 text-indigo-700">
                            <p className="flex items-start">
                                <span className="mr-2">🔍</span>
                                <span>Gunakan fitur pencarian untuk menemukan siswa dengan cepat berdasarkan nama atau NIS</span>
                            </p>
                            <p className="flex items-start">
                                <span className="mr-2">📊</span>
                                <span>Filter data siswa berdasarkan kelas atau jenis kelamin untuk analisis yang lebih mudah</span>
                            </p>
                            <p className="flex items-start">
                                <span className="mr-2">📱</span>
                                <span>Aplikasi ini dapat diakses dari berbagai perangkat untuk kemudahan Anda</span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}