import { useState } from 'react';
import { Dialog, DialogPanel, Menu, MenuButton, MenuItems, Transition, TransitionChild } from '@headlessui/react';
import { Bars3Icon, BellIcon, ChartPieIcon, Cog6ToothIcon, CreditCardIcon, UserPlusIcon, CurrencyDollarIcon, HomeIcon, UsersIcon, XMarkIcon, ShieldCheckIcon, KeyIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import TableAdmin from '../components/TableAdmin'; 
import TableClient from '../components/TableClient'; 
import TableAccount from '../components/TableAccount';
import DatesDashboard from '../components/DatesDashboard';
import TableCredit from '../components/TableCredit';
import ReportsAdmin from '../components/ReportsAdmin';
import ContributionsAdmin from '../components/ContributionsAdmin';
import ResetPasswordAdmin from '../components/ResetPasswordAdmin';
import CreditPaymentAdmin from '../components/CreditPaymentAdmin';
import { useAuthUser } from '../context/AuthUserContext';

const navigation = [
  { name: 'Panel principal', href: '/dashboard-admin/dates-dashboard', icon: HomeIcon, current: true },
  { name: 'Crear Administrador', href: '/dashboard-admin/table-admin', icon: ShieldCheckIcon, current: false },
  { name: 'Crear Socio', href: '/dashboard-admin/table-partner', icon: UsersIcon, current: false },
  { name: 'Restablecer Contraseñas', href: '/dashboard-admin/reset-password-admin', icon: KeyIcon, current: false },
  { name: 'Crear cuentas', href: '/dashboard-admin/table-account', icon: UserPlusIcon, current: false },
  { name: 'Aportes', href: '/dashboard-admin/contributions-admin', icon: CurrencyDollarIcon, current: false }, 
  { name: 'Crédito', href: '/dashboard-admin/table-credit', icon: CreditCardIcon, current: false }, 
  { name: 'Aprobar pagos de crédito', href: '/dashboard-admin/credit-payment-admin', icon: CheckCircleIcon, current: false }, 
  { name: 'Reportes', href: '/dashboard-admin/reports-admin', icon: ChartPieIcon, current: false },
];

const teams = [];

// const userNavigation = [
//   { name: 'Your profile', href: '#' },
//   { name: 'Sign out', href: '/login-admin'},
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
                                  className={classNames(
                                    location.pathname === item.href
                                      ? 'bg-gray-800 text-yellow-600'
                                      : 'text-white hover:bg-gray-800 hover:text-yellow-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
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
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-50 text-yellow-600'
                                      : 'text-white hover:bg-gray-800 hover:text-yellow-600',
                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                  )}
                                >
                                  <span
                                    className={classNames(
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
                            Configuraciones
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
                          className={classNames(
                            location.pathname === item.href
                              ? 'bg-gray-50 text-yellow-600'
                              : 'text-white hover:bg-gray-800 hover:text-yellow-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <item.icon
                            className={classNames(
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
                          className={classNames(
                            team.current
                              ? 'bg-gray-50 text-yellow-600'
                              : 'text-white hover:bg-gray-800 hover:text-yellow-600',
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                          )}
                        >
                          <span
                            className={classNames(
                              team.current
                                ? 'border-yellow-600 text-yellow-600'
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
                    Configuracion
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                {/* <label htmlFor="search-field" className="sr-only">Search</label>
                <MagnifyingGlassIcon className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" aria-hidden="true" />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                /> */}
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />

                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="/icon-admin5.png"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{user.name} {user.lastname}</span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </MenuButton>
                  <Transition>
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              {item.name}
                            </Link>
                          )}
                          
                        </MenuItem>
                        
                      ))} */}
                      <Link to='/dashboard-admin/table-admin' className={classNames('block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold')}>Perfil</Link>
                      <Link to='/' onClick={() => {logout()}} className={classNames('block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-bold')}>Cerrar sesión</Link>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard-admin/dates-dashboard" />} />
              <Route path="dates-dashboard" element={<DatesDashboard />} />
              <Route path="table-admin" element={<TableAdmin />} />
              <Route path="table-partner" element={<TableClient />} />
              <Route path='table-account' element={<TableAccount />} />
              <Route path='table-credit' element={<TableCredit />} />
              <Route path='reports-admin' element={<ReportsAdmin />} />
              <Route path='contributions-admin' element={<ContributionsAdmin />} />
              <Route path='reset-password-admin' element={<ResetPasswordAdmin />} />
              <Route path='/credit-payment-admin/*' element={<CreditPaymentAdmin />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
}