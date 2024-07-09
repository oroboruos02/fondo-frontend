import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, MinusSmallIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {ArrowPathIcon,CheckIcon,CloudArrowUpIcon,Cog6ToothIcon,FingerPrintIcon,LockClosedIcon,ServerIcon} from '@heroicons/react/20/solid'

const navigation = [
  { name: '', href: '#' },
  { name: '', href: '#' },
  { name: '', href: '#' },
  { name: '', href: '#' },
]
const features = [
  {
    name: 'Préstamo de Capital.',
    description: 'Ofrecemos préstamos de capital a empresas con alto potencial de crecimiento, ayudándoles a expandir sus operaciones y a mejorar su rendimiento financiero. Nuestro enfoque se centra en analizar minuciosamente cada oportunidad para garantizar que nuestros préstamos generen retornos consistentes y seguros.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Inversión en Acciones.',
    description: 'Invertimos en una selección cuidadosamente curada de acciones, buscando empresas con sólidos fundamentos financieros y un crecimiento sostenible. Nuestro equipo de analistas utiliza técnicas avanzadas de análisis de mercado para identificar las mejores oportunidades de inversión en el mercado bursátil.',
    icon: LockClosedIcon,
  },
  {
    name: 'Inversión en Empresas de Software SAAS.',
    description: 'Nos especializamos en invertir en empresas de software con modelos de facturación recurrente (SAAS), reconociendo el potencial de crecimiento y la estabilidad que ofrecen estas empresas. Apoyamos a estas compañías no solo con capital, sino también con asesoría estratégica para impulsar su desarrollo y expansión.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Compromiso con Nuestros Inversionistas.',
    description: 'En Capitum, valoramos la transparencia y la comunicación continua con nuestros socios. Proporcionamos informes trimestrales detallados sobre el rendimiento de tus inversiones y mantenemos un canal abierto para cualquier consulta o asesoría que necesites.',
    icon: FingerPrintIcon,
  },
  {
    name: 'Únete a Capitum.',
    description: 'Si buscas una manera confiable y efectiva de hacer crecer tu patrimonio, Capitum es tu mejor opción. Te invitamos a formar parte de nuestro fondo de inversión y a descubrir cómo nuestras estrategias pueden ayudarte a alcanzar tus objetivos financieros.',
    icon: Cog6ToothIcon,
  },
  {
    name: 'Contacta con nosotros.',
    description: 'Visita nuestra página web o contáctanos para más información sobre cómo unirte a Capitum y comenzar tu viaje hacia el éxito financiero. ',
    icon: ServerIcon,
  },
]
const tiers = [
  {
    name: 'Inversiones Básicas',
    id: 'tier-basic',
    href: '#',
    priceMonthly: '$100',
    description: "El plan perfecto si estás comenzando a invertir.",
    features: [
      'Acceso a préstamos de capital',
      'Inversiones en acciones',
      'Inversiones en empresas de software (SAAS)',
      'Consultoría básica de inversión',
      'Reporte mensual de inversiones',
    ],
    featured: false,
  },
  {
    name: 'Inversiones Avanzadas',
    id: 'tier-advanced',
    href: '#',
    priceMonthly: '$500',
    description: 'Soporte dedicado e infraestructura avanzada para tus inversiones.',
    features: [
      'Acceso a préstamos de capital prioritarios',
      'Inversiones en acciones premium',
      'Inversiones en empresas de software (SAAS) con alta rentabilidad',
      'Consultoría avanzada de inversión',
      'Reporte semanal de inversiones',
      'Representante dedicado de soporte',
      'Automatizaciones de marketing',
      'Integraciones personalizadas',
    ],
    featured: true,
  },
]
const faqs = [
  {
    question: "¿Qué es un fondo de inversión?",
    answer:
      "Un fondo de inversión es un vehículo de inversión colectiva que agrupa el dinero de varios inversores para invertir en una variedad de activos, como acciones, bonos, bienes raíces y otros instrumentos financieros.",
  },
  {
    question: "¿Cómo puedo invertir en un fondo de inversión?",
    answer:
      "Para invertir en un fondo de inversión, generalmente necesitas contactar a una entidad financiera que ofrezca fondos de inversión y abrir una cuenta de inversión. Luego, puedes seleccionar el fondo en el que deseas invertir y realizar tu inversión inicial.",
  },
  {
    question: "¿Cuál es el rendimiento esperado de un fondo de inversión?",
    answer:
      "El rendimiento de un fondo de inversión puede variar significativamente según los activos en los que invierte y las condiciones del mercado. Los fondos de renta variable tienden a tener rendimientos potencialmente más altos pero con mayor riesgo, mientras que los fondos de renta fija ofrecen rendimientos más estables pero más bajos.",
  },
  // More questions...
]
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analitica', href: '#' },
    { name: 'Comercio', href: '#' },
    { name: 'Perspectivas', href: '#' },
  ],
  support: [
    { name: 'Precios', href: '#' },
    { name: 'Documentacion', href: '#' },
    { name: 'Guias', href: '#' },
    { name: 'Estado', href: '#' },
  ],
  company: [
    { name: 'Acerca de', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Trabajos', href: '#' },
    { name: 'Prensa', href: '#' },
    { name: 'Socios', href: '#' },
  ],
  legal: [
    { name: 'Afirmar', href: '#' },
    { name: 'Privacidad', href: '#' },
    { name: 'Terminos', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-12 w-auto" src="./fondo.png" alt="" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href} className="text-sm font-semibold leading-6 text-white">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/login-client" className="text-sm font-semibold leading-6 text-white mr-4">
              Iniciar sesión <span aria-hidden="true">&rarr;</span>
            </Link>
            <Link to="/registerclient" className="text-sm font-semibold leading-6 text-white">
              Crea tu cuenta <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src="./fondo.png" alt="" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    to="/login-client"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    to="/registerclient"
                    className="-mx-3 mt-4 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Crea tu cuenta
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <main>
        {/* Hero section */}
        <div className="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20">
  <img
    src="./banner.jpg"
    alt=""
    className="absolute inset-0 -z-10 h-full w-full object-cover"
  />
  <div className="absolute inset-0 -z-10 bg-black opacity-50" /> {/* Overlay oscuro */}
  <div
    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    aria-hidden="true"
  >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-28">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                {/* <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
                  Announcing our next round of funding.{' '}
                  <a href="#" className="font-semibold text-white">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Read more <span aria-hidden="true">&rarr;</span>
                  </a>
                </div> */}
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Bienvenido a Capitum: Tu Aliado en Inversiones Estratégicas
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                  En Capitum, entendemos que el éxito financiero se construye sobre la base de inversiones inteligentes y diversificadas.
                  Nuestro fondo de inversión está diseñado para ofrecerte oportunidades sólidas y rentables en tres áreas clave: préstamos
                  de capital, inversiones en acciones, e inversiones en empresas de software con facturación recurrente (SAAS).
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    to="/form-credit"
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                >
                    Solicita tu préstamo aquí!
                </Link>
                    {/* <Link to="#" className="text-sm font-semibold leading-6 text-white">
                        Live demo <span aria-hidden="true">→</span>
                    </Link> */}
                </div>
              </div>
            </div>

            {/* Logo cloud */}
            <div className="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://axongroup.com.co/wp-content/uploads/logo-axon-group-blanco.svg"
                alt="Axon-Group"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
                alt="Reform"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
                alt="Tuple"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
                alt="SavvyCal"
                width={158}
                height={48}
              />
              <img
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
                alt="Statamic"
                width={158}
                height={48}
              />
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
        </div>

        {/* Feature section */}
        <div className="mt-32 sm:mt-56">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2> */}
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">¿Quiénes Somos?</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
              Capitum es un fondo de inversión comprometido con la creación de valor financiero a largo plazo para nuestros socios.
              Nuestra misión es ofrecer soluciones de inversión que se alineen con tus objetivos financieros, proporcionándote el
              respaldo y la experiencia necesarios para maximizar tus rendimientos.

              </p>
            </div>
          </div>
          <div className="relative overflow-hidden pt-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <img
                src="./section.jpg"
                alt="App screenshot"
                className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                width={2432}
                height={1442}
              />
              <div className="relative" aria-hidden="true">
                <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
            <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon className="absolute left-1 top-1 h-5 w-5 text-indigo-600" aria-hidden="true" />
                    {feature.name}
                  </dt>{' '}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Testimonial section */}
        <div className="relative z-10 mt-32 bg-gray-900 pb-20 sm:mt-56 sm:pb-24 xl:pb-0">
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute left-[calc(50%-19rem)] top-[calc(50%-36rem)] transform-gpu blur-3xl">
              <div
                className="aspect-[1097/1023] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
            </div>
          </div>
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-x-8 gap-y-10 px-6 sm:gap-y-8 lg:px-8 xl:flex-row xl:items-stretch">
            <div className="-mt-8 w-full max-w-2xl xl:-mb-8 xl:w-96 xl:flex-none">
              <div className="relative aspect-[2/1] h-full md:-mx-8 xl:mx-0 xl:aspect-auto">
                <img
                  className="absolute inset-0 h-full w-full rounded-2xl bg-gray-800 object-cover shadow-2xl"
                  src="./section3.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full max-w-2xl xl:max-w-none xl:flex-auto xl:px-16 xl:py-24">
              <figure className="relative isolate pt-6 sm:pt-12">
                <svg
                  viewBox="0 0 162 128"
                  fill="none"
                  aria-hidden="true"
                  className="absolute left-0 top-0 -z-10 h-32 stroke-white/20"
                >
                  <path
                    id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                    d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
                  />
                  <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x={86} />
                </svg>
                <blockquote className="text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Transforma tu Futuro Financiero con Inversiones Inteligentes</p>
                  <p>
                  En Capitum, creemos que cada inversión es una oportunidad para construir un futuro más sólido y próspero. Al invertir con nosotros,
                  estás dando un paso hacia la libertad financiera y el crecimiento sostenible. Nuestros expertos están dedicados a maximizar tu
                  capital a través de estrategias diversificadas y bien fundamentadas. No solo inviertes tu dinero, inviertes en tu tranquilidad y en un
                  futuro lleno de posibilidades. ¡Empieza hoy y ve cómo tus sueños financieros se convierten en realidad!
                  </p>
                </blockquote>
                <figcaption className="mt-8 text-base">
                  <div className="font-semibold text-white">Yesid Alfonso Anacona</div>
                  <div className="mt-1 text-gray-400">CEO of Axon Group</div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Pricing section */}
        <div className="relative isolate mt-32 bg-white px-6 sm:mt-56 lg:px-8">
          <div
            className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
            aria-hidden="true"
          >
            <div
              className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
  <h2 className="text-base font-semibold leading-7 text-indigo-600">Fondo de Inversión Capitum</h2>
  <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
    Inversiones estratégicas para tu futuro financiero
  </p>
</div>
<p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
  En Capitum, nos especializamos en ofrecer oportunidades de inversión sólidas y rentables en tres áreas clave: préstamos de capital, inversiones en acciones, e inversiones en empresas de software con facturación recurrente (SAAS). Nuestro compromiso es ayudarte a alcanzar tus objetivos financieros con estrategias personalizadas y asesoramiento experto.
</p>
          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
            {tiers.map((tier, tierIdx) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                  tier.featured
                    ? ''
                    : tierIdx === 0
                    ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                    : 'sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                  'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10'
                )}
              >
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                    'text-base font-semibold leading-7'
                  )}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 flex items-baseline gap-x-2">
                  <span
                    className={classNames(
                      tier.featured ? 'text-white' : 'text-gray-900',
                      'text-5xl font-bold tracking-tight'
                    )}
                  >
                    {tier.priceMonthly}
                  </span>
                  <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>
                    /month
                  </span>
                </p>
                <p
                  className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base leading-7')}
                >
                  {tier.description}
                </p>
                <ul
                  role="list"
                  className={classNames(
                    tier.featured ? 'text-gray-300' : 'text-gray-600',
                    'mt-8 space-y-3 text-sm leading-6 sm:mt-10'
                  )}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className={classNames(
                          tier.featured ? 'text-indigo-400' : 'text-indigo-600',
                          'h-6 w-5 flex-none'
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.featured
                      ? 'bg-indigo-500 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-indigo-500'
                      : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline-indigo-600',
                    'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
                  )}
                >
                  Empiece hoy
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Preguntas frecuentes</h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <DisclosureButton className="flex w-full items-start justify-between text-left text-gray-900">
                          <span className="text-base font-semibold leading-7">{faq.question}</span>
                          <span className="ml-6 flex h-7 items-center">
                            {open ? (
                              <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                            ) : (
                              <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </dt>
                      <DisclosurePanel as="dd" className="mt-2 pr-12">
                        <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 bg-gray-900 sm:mt-56" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <img
              className="h-20"
              src="/fondo.png"
              alt="Company name"
            />
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Soluciones</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.solutions.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Soporte</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.support.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-white">Compania</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.company.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp bottom */}
      <div className="fixed bottom-3 right-4 z-10">
          <a href="https://api.whatsapp.com/send?phone=+573013811981&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n." target="_blank" rel="noopener noreferrer" className="block bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300" aria-label="WhatsApp">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/598px-WhatsApp.svg.png" alt="WhatsApp Icon" className="h-6 w-6 text-white" />
          </a>
      </div>
    </div>
  )
}