import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <>
            <Head title="Sistem Informasi Siswa SD" />
            
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
                <div className="container mx-auto px-4 py-16">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            📚 Sistem Informasi Siswa SD
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Platform digital terpadu untuk mengelola data siswa, guru, dan kelas di sekolah dasar. 
                            Mudah digunakan, aman, dan efisien untuk kebutuhan administrasi sekolah modern.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold mb-3">Manajemen Siswa</h3>
                            <p className="text-gray-600">
                                Kelola data lengkap siswa dengan fitur pencarian, filter, dan ekspor. 
                                Termasuk NIS, NISN, biodata, dan informasi orang tua.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-4xl mb-4">🏫</div>
                            <h3 className="text-xl font-semibold mb-3">Manajemen Kelas</h3>
                            <p className="text-gray-600">
                                Organisasi kelas yang rapi dari kelas 1-6, pengelolaan wali kelas, 
                                dan statistik jumlah siswa per kelas.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-4xl mb-4">👨‍🏫</div>
                            <h3 className="text-xl font-semibold mb-3">Data Guru</h3>
                            <p className="text-gray-600">
                                Kelola profil guru dengan NIP, mata pelajaran yang diampu, 
                                dan penugasan sebagai wali kelas.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-4xl mb-4">🔄</div>
                            <h3 className="text-xl font-semibold mb-3">Mutasi Siswa</h3>
                            <p className="text-gray-600">
                                Pencatatan lengkap mutasi siswa masuk dan keluar dengan 
                                tanggal dan keterangan yang detail.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3">Dashboard & Laporan</h3>
                            <p className="text-gray-600">
                                Dashboard interaktif dengan statistik siswa, grafik gender, 
                                dan laporan yang dapat diekspor ke PDF/Excel.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="text-4xl mb-4">🔐</div>
                            <h3 className="text-xl font-semibold mb-3">Role-Based Access</h3>
                            <p className="text-gray-600">
                                Sistem akses bertingkat: Admin dengan akses penuh, 
                                Guru dengan akses baca untuk data siswa dan kelas.
                            </p>
                        </div>
                    </div>

                    {/* Screenshots/Mockups */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8">Tampilan Aplikasi</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-48 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-white text-lg font-semibold">📊 Dashboard Overview</span>
                                </div>
                                <h4 className="font-semibold mb-2">Dashboard Admin</h4>
                                <p className="text-sm text-gray-600">
                                    Ringkasan statistik siswa, grafik distribusi gender, dan data per kelas
                                </p>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <div className="bg-gradient-to-r from-green-500 to-teal-600 h-48 rounded-lg mb-4 flex items-center justify-center">
                                    <span className="text-white text-lg font-semibold">📝 Data Management</span>
                                </div>
                                <h4 className="font-semibold mb-2">Manajemen Data</h4>
                                <p className="text-sm text-gray-600">
                                    Interface yang intuitif untuk CRUD data siswa, guru, dan kelas
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* User Roles */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                        <h2 className="text-2xl font-bold text-center mb-8">Akses Berdasarkan Peran</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="text-center">
                                <div className="text-5xl mb-4">👨‍💼</div>
                                <h3 className="text-xl font-semibold mb-3">Administrator</h3>
                                <ul className="text-left space-y-2">
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Kelola semua data siswa (CRUD)
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Manajemen data guru dan kelas
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Pencatatan mutasi siswa
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-2">✓</span>
                                        Export laporan dan data
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="text-center">
                                <div className="text-5xl mb-4">👨‍🏫</div>
                                <h3 className="text-xl font-semibold mb-3">Guru</h3>
                                <ul className="text-left space-y-2">
                                    <li className="flex items-center">
                                        <span className="text-blue-500 mr-2">👁</span>
                                        Lihat data siswa
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-blue-500 mr-2">👁</span>
                                        Lihat data kelas
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-blue-500 mr-2">👁</span>
                                        Akses dashboard statistik
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-blue-500 mr-2">👁</span>
                                        Filter dan pencarian data
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-6">Siap Memulai?</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Login dengan akun Anda untuk mengakses sistem informasi siswa
                        </p>
                        
                        <div className="space-x-4">
                            <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg">
                                <Link href="/login">
                                    🚀 Login Sekarang
                                </Link>
                            </Button>
                            
                            <Button asChild variant="outline" size="lg" className="px-8 py-3 text-lg">
                                <Link href="/register">
                                    📝 Daftar Akun Baru
                                </Link>
                            </Button>
                        </div>
                        
                        <div className="mt-8 text-sm text-gray-500">
                            <p><strong>Demo Admin:</strong> admin@sekolah.com / password</p>
                            <p><strong>Demo Guru:</strong> guru1a@sekolah.com / password</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}