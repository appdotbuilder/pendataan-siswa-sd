import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
}

interface SchoolClass {
    id: number;
    name: string;
}

interface Filters {
    search?: string;
    class_filter?: string;
    gender_filter?: string;
}

interface Props {
    students: {
        data: Student[];
        links: Array<{ url?: string; label: string; active: boolean }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    classes: SchoolClass[];
    filters: Filters;
    [key: string]: unknown;
}

export default function StudentsIndex({ students, classes, filters }: Props) {
    const isAdmin = (window as unknown as { auth?: { user?: { role?: string } } }).auth?.user?.role === 'admin';

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const class_filter = formData.get('class_filter') as string;
        const gender_filter = formData.get('gender_filter') as string;

        router.get('/students', {
            search: search || undefined,
            class_filter: class_filter || undefined,
            gender_filter: gender_filter || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        router.get('/students', {}, {
            preserveState: true,
        });
    };

    return (
        <AppShell>
            <Head title="Data Siswa" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">👥 Data Siswa</h1>
                        <p className="text-gray-600 mt-2">
                            Kelola dan lihat data siswa sekolah
                        </p>
                    </div>
                    
                    {isAdmin && (
                        <Button asChild>
                            <Link href="/students/create">
                                ➕ Tambah Siswa
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    🔍 Cari Siswa
                                </label>
                                <input
                                    type="text"
                                    name="search"
                                    defaultValue={filters.search || ''}
                                    placeholder="Nama atau NIS..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    🏫 Kelas
                                </label>
                                <select
                                    name="class_filter"
                                    defaultValue={filters.class_filter || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Kelas</option>
                                    {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            Kelas {cls.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    👫 Jenis Kelamin
                                </label>
                                <select
                                    name="gender_filter"
                                    defaultValue={filters.gender_filter || ''}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="">Semua Gender</option>
                                    <option value="male">👦 Laki-laki</option>
                                    <option value="female">👧 Perempuan</option>
                                </select>
                            </div>

                            <div className="flex items-end space-x-2">
                                <Button type="submit" className="flex-1">
                                    Cari
                                </Button>
                                {(filters.search || filters.class_filter || filters.gender_filter) && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={clearFilters}
                                    >
                                        Reset
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Students Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Siswa
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NIS / NISN
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kelas
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gender
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.data.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {student.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {student.parent_name} (Ortu)
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                NIS: {student.nis}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                NISN: {student.nisn}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                🏫 {student.class.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {student.gender === 'male' ? '👦 Laki-laki' : '👧 Perempuan'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
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
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <Link
                                                href={`/students/${student.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                👁 Lihat
                                            </Link>
                                            {isAdmin && (
                                                <>
                                                    <Link
                                                        href={`/students/${student.id}/edit`}
                                                        className="text-green-600 hover:text-green-900 ml-3"
                                                    >
                                                        ✏️ Edit
                                                    </Link>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {students.data.length === 0 && (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">📚</span>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Belum ada data siswa
                            </h3>
                            <p className="text-gray-500">
                                {filters.search || filters.class_filter || filters.gender_filter
                                    ? 'Tidak ada siswa yang sesuai dengan filter yang dipilih.'
                                    : 'Mulai dengan menambahkan siswa baru.'}
                            </p>
                            {isAdmin && !(filters.search || filters.class_filter || filters.gender_filter) && (
                                <Button asChild className="mt-4">
                                    <Link href="/students/create">
                                        ➕ Tambah Siswa Pertama
                                    </Link>
                                </Button>
                            )}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {students.last_page > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {students.current_page > 1 && (
                                <Link
                                    href={students.links.find(link => link.label.includes('Previous'))?.url || '#'}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {students.current_page < students.last_page && (
                                <Link
                                    href={students.links.find(link => link.label.includes('Next'))?.url || '#'}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Menampilkan{' '}
                                    <span className="font-medium">
                                        {(students.current_page - 1) * students.per_page + 1}
                                    </span>
                                    {' '}sampai{' '}
                                    <span className="font-medium">
                                        {Math.min(students.current_page * students.per_page, students.total)}
                                    </span>
                                    {' '}dari{' '}
                                    <span className="font-medium">{students.total}</span>
                                    {' '}hasil
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    {students.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                link.active
                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } ${
                                                index === 0 ? 'rounded-l-md' : ''
                                            } ${
                                                index === students.links.length - 1 ? 'rounded-r-md' : ''
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}