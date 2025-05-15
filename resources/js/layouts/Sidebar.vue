<template>
  <div class="flex h-screen bg-gray-200">
    <div
      :class="sidebarOpen ? 'block' : 'hidden'"
      @click="sidebarOpen = false"
      class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
    ></div>

    <div
      :class="
        sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
      "
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center flex-col justify-center my-8">
        <p
          class="px-2 py-1 rounded text-white font-semibold text-2xl uppercase flex flex-col items-center"
        >
          bumi kahuripan

          <span
            class="text-indigo-500 tracking-wider text-sm font-normal capitalize"
          >
            point of sales app
          </span>
        </p>
      </div>

      <nav>
        <div
          :class="[
            'flex items-center px-6 py-2 mt-4 text-white',
            $route.path.includes('dashboard')
              ? 'bg-indigo-500'
              : 'hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
          ]"
          v-if="user && user.role.name === 'Super Admin'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0,0,255.98959,255.98959"
          >
            <g
              fill="#ffffff"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <g transform="scale(10.66667,10.66667)">
                <path
                  d="M12,2c-0.26712,0.00003 -0.52312,0.10694 -0.71094,0.29688l-10.08594,8.80078c-0.12774,0.09426 -0.20313,0.24359 -0.20312,0.40234c0,0.27614 0.22386,0.5 0.5,0.5h2.5v8c0,0.552 0.448,1 1,1h4c0.552,0 1,-0.448 1,-1v-6h4v6c0,0.552 0.448,1 1,1h4c0.552,0 1,-0.448 1,-1v-8h2.5c0.27614,0 0.5,-0.22386 0.5,-0.5c0.00001,-0.15876 -0.07538,-0.30808 -0.20312,-0.40234l-10.08008,-8.79492c-0.00194,-0.00196 -0.0039,-0.00391 -0.00586,-0.00586c-0.18782,-0.18994 -0.44382,-0.29684 -0.71094,-0.29687z"
                ></path>
              </g>
            </g>
          </svg>

          <span class="mx-3 capitalize">
            <RouterLink to="/dashboard" class="m-0">beranda</RouterLink>
          </span>
        </div>

        <div
          :class="[
            'flex items-center px-6 py-2 mt-4 text-white',
            $route.path.includes('orders')
              ? 'bg-indigo-500'
              : 'hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
          ]"
          v-if="user"
        >
          <svg
            version="1.1"
            id="_x32_"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24"
            height="24"
            viewBox="0 0 512 512"
            xml:space="preserve"
            fill="#ffffff"
            stroke="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path
                  class="st0"
                  d="M147.57,320.188c-0.078-0.797-0.328-1.531-0.328-2.328v-6.828c0-3.25,0.531-6.453,1.594-9.5 c0,0,17.016-22.781,25.063-49.547c-8.813-18.594-16.813-41.734-16.813-64.672c0-5.328,0.391-10.484,0.938-15.563 c-11.484-12.031-27-18.844-44.141-18.844c-35.391,0-64.109,28.875-64.109,73.75c0,35.906,29.219,74.875,29.219,74.875 c1.031,3.047,1.563,6.25,1.563,9.5v6.828c0,8.516-4.969,16.266-12.719,19.813l-46.391,18.953 C10.664,361.594,2.992,371.5,0.852,383.156l-0.797,10.203c-0.406,5.313,1.406,10.547,5.031,14.438 c3.609,3.922,8.688,6.125,14.016,6.125H94.93l3.109-39.953l0.203-1.078c3.797-20.953,17.641-38.766,36.984-47.672L147.57,320.188z"
                ></path>
                <path
                  class="st0"
                  d="M511.148,383.156c-2.125-11.656-9.797-21.563-20.578-26.531l-46.422-18.953 c-7.75-3.547-12.688-11.297-12.688-19.813v-6.828c0-3.25,0.516-6.453,1.578-9.5c0,0,29.203-38.969,29.203-74.875 c0-44.875-28.703-73.75-64.156-73.75c-17.109,0-32.625,6.813-44.141,18.875c0.563,5.063,0.953,10.203,0.953,15.531 c0,22.922-7.984,46.063-16.781,64.656c8.031,26.766,25.078,49.563,25.078,49.563c1.031,3.047,1.578,6.25,1.578,9.5v6.828 c0,0.797-0.266,1.531-0.344,2.328l11.5,4.688c20.156,9.219,34,27.031,37.844,47.984l0.188,1.094l3.094,39.969h75.859 c5.328,0,10.406-2.203,14-6.125c3.625-3.891,5.438-9.125,5.031-14.438L511.148,383.156z"
                ></path>
                <path
                  class="st0"
                  d="M367.867,344.609l-56.156-22.953c-9.375-4.313-15.359-13.688-15.359-23.969v-8.281 c0-3.906,0.625-7.797,1.922-11.5c0,0,35.313-47.125,35.313-90.594c0-54.313-34.734-89.234-77.594-89.234 c-42.844,0-77.594,34.922-77.594,89.234c0,43.469,35.344,90.594,35.344,90.594c1.266,3.703,1.922,7.594,1.922,11.5v8.281 c0,10.281-6.031,19.656-15.391,23.969l-56.156,22.953c-13.047,5.984-22.344,17.984-24.906,32.109l-2.891,37.203h139.672h139.672 l-2.859-37.203C390.211,362.594,380.914,350.594,367.867,344.609z"
                ></path>
              </g>
            </g>
          </svg>

          <span class="mx-3 capitalize">
            <RouterLink to="/orders" class="m-0">tamu</RouterLink>
          </span>
        </div>

        <div
          :class="[
            'flex items-center px-6 py-2 mt-4 text-white',
            $route.path.includes('rooms')
              ? 'bg-indigo-500'
              : 'hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
          ]"
          v-if="user && user.role.name === 'Super Admin'"
        >
          <svg
            class="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M2.535 11A3.981 3.981 0 0 0 2 13v4a1 1 0 0 0 1 1h2v1a1 1 0 1 0 2 0v-1h10v1a1 1 0 1 0 2 0v-1h2a1 1 0 0 0 1-1v-4c0-.729-.195-1.412-.535-2H2.535ZM20 9V8a4 4 0 0 0-4-4h-3v5h7Zm-9-5H8a4 4 0 0 0-4 4v1h7V4Z"
            />
          </svg>

          <span class="mx-3 capitalize">
            <RouterLink to="/rooms" class="m-0">kamar</RouterLink>
          </span>
        </div>

        <div
          :class="[
            'flex items-center px-6 py-2 mt-4 text-white',
            $route.path.includes('settings')
              ? 'bg-indigo-500'
              : 'hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
          ]"
          v-if="user && user.role.name === 'Super Admin'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24"
            height="24"
            viewBox="0,0,255.98959,255.98959"
          >
            <g
              fill="#ffffff"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <g transform="scale(5.12,5.12)">
                <path
                  d="M47.16,21.221l-5.91,-0.966c-0.346,-1.186 -0.819,-2.326 -1.411,-3.405l3.45,-4.917c0.279,-0.397 0.231,-0.938 -0.112,-1.282l-3.889,-3.887c-0.347,-0.346 -0.893,-0.391 -1.291,-0.104l-4.843,3.481c-1.089,-0.602 -2.239,-1.08 -3.432,-1.427l-1.031,-5.886c-0.084,-0.478 -0.499,-0.828 -0.985,-0.828h-5.5c-0.49,0 -0.908,0.355 -0.987,0.839l-0.956,5.854c-1.2,0.345 -2.352,0.818 -3.437,1.412l-4.83,-3.45c-0.399,-0.285 -0.942,-0.239 -1.289,0.106l-3.887,3.887c-0.343,0.343 -0.391,0.883 -0.112,1.28l3.399,4.863c-0.605,1.095 -1.087,2.254 -1.438,3.46l-5.831,0.971c-0.482,0.08 -0.836,0.498 -0.836,0.986v5.5c0,0.485 0.348,0.9 0.825,0.985l5.831,1.034c0.349,1.203 0.831,2.362 1.438,3.46l-3.441,4.813c-0.284,0.397 -0.239,0.942 0.106,1.289l3.888,3.891c0.343,0.343 0.884,0.391 1.281,0.112l4.87,-3.411c1.093,0.601 2.248,1.078 3.445,1.424l0.976,5.861c0.079,0.481 0.496,0.834 0.985,0.834h5.5c0.485,0 0.9,-0.348 0.984,-0.825l1.045,-5.89c1.199,-0.353 2.348,-0.833 3.43,-1.435l4.905,3.441c0.398,0.281 0.938,0.232 1.282,-0.111l3.888,-3.891c0.346,-0.347 0.391,-0.894 0.104,-1.292l-3.498,-4.857c0.593,-1.08 1.064,-2.222 1.407,-3.408l5.918,-1.039c0.479,-0.084 0.827,-0.5 0.827,-0.985v-5.5c0.001,-0.49 -0.354,-0.908 -0.838,-0.987zM25,32c-3.866,0 -7,-3.134 -7,-7c0,-3.866 3.134,-7 7,-7c3.866,0 7,3.134 7,7c0,3.866 -3.134,7 -7,7z"
                ></path>
              </g>
            </g>
          </svg>

          <span class="mx-3 capitalize">
            <RouterLink to="/settings" class="m-0">pengaturan</RouterLink>
          </span>
        </div>
      </nav>
    </div>

    <div class="flex flex-col flex-1 overflow-hidden">
      <header
        class="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-600"
      >
        <button
          @click="sidebarOpen = true"
          class="text-gray-500 focus:outline-none lg:hidden"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>

        <div
          class="flex items-center lg:gap-0 gap-4 lg:justify-between justify-end w-full sm:ms-0 ms-2"
          v-if="user.name"
        >
          <p class="capitalize">
            selamat datang,
            <span class="font-semibold"> {{ user.name }}! </span>
          </p>

          <button
            class="outline outline-red-500 uppercase px-3 py-1 rounded-lg text-red-500 font-semibold"
            @click="logout"
          >
            keluar
          </button>
        </div>
      </header>

      <RouterView :current-path="currentPath" />
    </div>
  </div>
</template>

<script>
import { getMe, logout } from '../apis/auth'

export default {
  data() {
    return {
      sidebarOpen: false,
      user: ''
    }
  },
  mounted() {
    this.getProfile()
  },
  computed: {
    currentPath() {
      return this.$route.path
    }
  },
  methods: {
    async getProfile() {
      const res = await getMe()

      this.user = res.data.user
    },
    async logout() {
      try {
        const res = await logout()

        if (res.status === 200) {
          alert('Logout berhasil.')
          localStorage.removeItem('auth-token')
          this.$router.push('/login')
        }
      } catch (err) {
        console.error(err.response.data)
      }
    }
  }
}
</script>
