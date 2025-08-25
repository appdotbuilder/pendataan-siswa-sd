import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Student {
    id: number;
    nis: string;
    nisn: string;
    name: string;
    gender: 'male' | 'female';
    birth_place: string;
    birth_date: string;
    address: string;
    parent_name: string;
    status: string;
    class: {
        id: number;
        name: string;
    };
    transfers?: Array<{
        id: number;
        type: 'in' | 'out';
        transfer_date: string;
        notes?: string;
        from_school?: string;
        to_school?: string;
    }>;
}

interface Props {
    student: Student;
    [key: string]: unknown;
}

export default function StudentShow({ student }: Props) {
    const isAdmin = (window as unknown as { auth?: { user?: { role?: string } } }).auth?.user?.role === 'admin';
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <Head title={`Detail Siswa - ${student.name}`} />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <nav className="text-sm text-gray-500 mb-2">
                            <Link href="/students" className="hover:text-gray-700">
                                Data Siswa
                            </Link>
                            <span className="mx-2">/</span>
                            <span>{student.name}</span>
                        </nav>
                        <h1 className="text-3xl font-bold">👤 {student.name}</h1>
                        <p className="text-gray-600 mt-2">
                            Detail informasi siswa
                        </p>
                    </div>
                    
                    <div className="flex space-x-2">
                        {isAdmin && (
                            <Button asChild variant="outline">
                                <Link href={`/students/${student.id}/edit`}>
                                    ✏️ Edit
                                </Link>
                            </Button>
                        )}
                        <Button asChild variant="outline">
                            <Link href="/students">
                                ← Kembali
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Student Info Card */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center mb-6">
                        <div className="text-6xl mr-4">
                            {student.gender === 'male' ? '👦' : '👧'}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">{student.name}</h2>
                            <p className="text-gray-600">
                                Kelas {student.class.name} • {student.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                            </p>
                            <div className="mt-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    student.status === 'active' 
                                        ? 'bg-green-100 text-green-800'
                                        : student.status === 'transferred_in'
                                        ? 'bg-blue-100 text-blue-800'  
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {student.status === 'active' && '✅ Aktif'}
                                    {student.status === 'transferred_in' && '📥 Pindah Masuk'}
                                    {student.status === 'transferred_out' && '📤 Pindah Keluar'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">📋 Data Pribadi</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    NIS
                                </label>
                                <p className="text-gray-900">{student.nis}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    NISN
                                </label>
                                <p className="text-gray-900">{student.nisn}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Tempat Lahir
                                </label>
                                <p className="text-gray-900">{student.birth_place}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Tanggal Lahir
                                </label>
                                <p className="text-gray-900">{formatDate(student.birth_date)}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-900">🏠 Informasi Keluarga</h3>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Nama Orang Tua/Wali
                                </label>
                                <p className="text-gray-900">{student.parent_name}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Alamat
                                </label>
                                <p className="text-gray-900">{student.address}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-500 mb-1">
                                    Kelas
                                </label>
                                <p className="text-gray-900">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        🏫 {student.class.name}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transfer History */}
                {student.transfers && student.transfers.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-4">🔄 Riwayat Mutasi</h3>
                        <div className="space-y-3">
                            {student.transfers.map((transfer) => (
                                <div key={transfer.id} className="border-l-4 border-indigo-400 pl-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium">
                                                {transfer.type === 'in' ? '📥 Pindah Masuk' : '📤 Pindah Keluar'}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {formatDate(transfer.transfer_date)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {transfer.from_school && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            <strong>Dari:</strong> {transfer.from_school}
                                        </p>
                                    )}
                                    
                                    {transfer.to_school && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            <strong>Ke:</strong> {transfer.to_school}
                                        </p>
                                    )}
                                    
                                    {transfer.notes && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            <strong>Keterangan:</strong> {transfer.notes}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}