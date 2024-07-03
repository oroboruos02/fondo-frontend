import { Fragment, useState, lazy, Suspense } from 'react';
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, Transition, TransitionChild } from '@headlessui/react';
import {
  Bars3Icon, BellIcon, CalendarIcon, ChartPieIcon, Cog6ToothIcon, CreditCardIcon,
  UserPlusIcon, CurrencyDollarIcon, HomeIcon, UsersIcon, XMarkIcon, ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { useAuthUser } from '../context/AuthUserContext';
import clsx from 'clsx';

const TableAdmin = lazy(() => import('../components/TableAdmin'));
const TableClient = lazy(() => import('../components/TableClient'));
const TableAccount = lazy(() => import('../components/TableAccount'));
const DatesDashboard = lazy(() => import('../components/DatesDashboard'));
const TableCredit = lazy(() => import('../components/TableCredit'));
const ReportsAdmin = lazy(() => import('../components/ReportsAdmin'));
const ContributionsAdmin = lazy(() => import('../components/ContributionsAdmin'));

const navigation = [
  { name: 'Panel principal', href: '/dashboard-admin/dates-dashboard', icon: HomeIcon, current: true },
  { name: 'Crear Administrador', href: '/dashboard-admin/table-admin', icon: ShieldCheckIcon, current: false },
  { name: 'Crear Socios', href: '/dashboard-admin/table-partner', icon: UsersIcon, current: false },
  { name: 'Crear Cuentas', href: '/dashboard-admin/table-account', icon: UserPlusIcon, current: false },
  { name: 'Aportes', href: '/dashboard-admin/contributions-admin', icon: CurrencyDollarIcon, current: false },
  { name: 'Credito', href: '/dashboard-admin/table-credit', icon: CreditCardIcon, current: false },
  { name: 'Reportes', href: '/dashboard-admin/reports-admin', icon: ChartPieIcon, current: false },
];

const teams = [];

export default function DashboardAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout, user } = useAuthUser();
  const location = useLocation();

  return (
    <>
      <div>
        <Transition show={sidebarOpen}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </TransitionChild>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img className="h-8 w-auto" src="/fondo.png" alt="Your Company" />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.href}
                                  className={clsx(
                                    location.pathname === item.href
                                      ? 'bg-gray-800 text-yellow-600'
                                      : 'text-white hover:bg-gray-800 hover:text-yellow-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200 ease-in-out'
                                  )}
                                >
                                  <item.icon
                                    className={clsx(
                                      location.pathname === item.href ? 'text-yellow-600' : 'text-gray-400 group-hover:text-yellow-600',
                                      'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <Link
                                  to={team.href}
                                  className={clsx(
                                    team.current
                                      ? 'bg-gray-50 text-yellow-600'
                                      : 'text-white hover:bg-gray-800 hover:text-yellow-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                  )}
                                >
                                  <span
                                    className={clsx(
                                      team.current
                                        ? 'border-gray-600 text-yellow-600'
                                        : 'border-gray-200 text-gray-400 group-hover:border-yellow-600 group-hover:text-yellow-600',
                                      'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-black text-[0.625rem] font-medium'
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-gray-800 hover:text-yellow-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-yellow-600"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-black px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img className="h-8 w-auto" src="/fondo.png" alt="Your Company" />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={clsx(
                            location.pathname === item.href
                              ? 'bg-gray-50 text-yellow-600'
                              : 'text-white hover:bg-gray-800 hover:text-yellow-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200 ease-in-out'
                          )}
                        >
                          <item.icon
                            className={clsx(
                              location.pathname === item.href ? 'text-yellow-600' : 'text-gray-400 group-hover:text-yellow-600',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <Link
                          to={team.href}
                          className={clsx(
                            team.current
                              ? 'bg-gray-50 text-yellow-600'
                              : 'text-white hover:bg-gray-800 hover:text-yellow-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <span
                            className={clsx(
                              team.current
                                ? 'border-gray-600 text-yellow-600'
                                : 'border-gray-200 text-gray-400 group-hover:border-yellow-600 group-hover:text-yellow-600',
                              'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border bg-black text-[0.625rem] font-medium'
                            )}
                          >
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-gray-800 hover:text-yellow-600"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-yellow-600"
                      aria-hidden="true"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-black px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  name="search"
                  className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-gray-400 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-yellow-600"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=dDP6L5kJL3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=3&w=144&h=144&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-white" aria-hidden="true">
                        {user ? user.email : 'Admin'}
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-black py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href="#"
                            className={clsx(
                              active ? 'bg-gray-50 text-yellow-600' : 'text-gray-400',
                              'block px-3 py-1 text-sm leading-6'
                            )}
                          >
                            Perfil
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <a
                            onClick={logout}
                            className={clsx(
                              active ? 'bg-gray-50 text-yellow-600' : 'text-gray-400',
                              'block px-3 py-1 text-sm leading-6'
                            )}
                          >
                            Cerrar sesion
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="p-6">
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard-admin/dates-dashboard" />} />
                <Route path="dates-dashboard" element={<DatesDashboard />} />
                <Route path="table-admin" element={<TableAdmin />} />
                <Route path="table-partner" element={<TableClient />} />
                <Route path='table-account' element={<TableAccount />} />
                <Route path='table-credit' element={<TableCredit />} />
                <Route path='reports-admin' element={<ReportsAdmin />} />
                <Route path='contributions-admin' element={<ContributionsAdmin />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}
