import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Teacher {
    id: number;
    name: string;
    nip: string;
    subject: string;
    homeroom_class?: {
        id: number;
        name: string;
    };
    user: {
        email: string;
    };
}

interface Props {
    teachers: {
        data: Teacher[];
        links: Array<{ url?: string; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    [key: string]: unknown;
}

export default function TeachersIndex({ teachers }: Props) {
    return (
        <AppShell>
            <Head title="Data Guru" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">👨‍🏫 Data Guru</h1>
                        <p className="text-gray-600 mt-2">
                            Kelola data guru dan tenaga pendidik
                        </p>
                    </div>
                    
                    <Button asChild>
                        <Link href="/teachers/create">
                            ➕ Tambah Guru
                        </Link>
                    </Button>
                </div>

                {/* Teachers Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama Guru
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NIP
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Mata Pelajaran
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Wali Kelas
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {teachers.data.map((teacher) => (
                                    <tr key={teacher.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {teacher.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {teacher.user.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {teacher.nip}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                📚 {teacher.subject}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {teacher.homeroom_class ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    🏫 {teacher.homeroom_class.name}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link
                                                href={`/teachers/${teacher.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                👁 Lihat
                                            </Link>
                                            <Link
                                                href={`/teachers/${teacher.id}/edit`}
                                                className="text-green-600 hover:text-green-900 ml-3"
                                            >
                                                ✏️ Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {teachers.data.length === 0 && (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">👨‍🏫</span>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Belum ada data guru
                            </h3>
                            <p className="text-gray-500">
                                Mulai dengan menambahkan guru baru.
                            </p>
                            <Button asChild className="mt-4">
                                <Link href="/teachers/create">
                                    ➕ Tambah Guru Pertama
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}