<template>
    <div id="app">
        <Header
            :currentRole="currentRole"
            @update-role="updateRole"
            @toggle-sidebar="toggleSidebar"
            :isSidebarVisible="isSidebarVisible"
        />
        <div class="app-content">
            <Sidebar
                :currentRole="currentRole"
                :isSidebarVisible="isSidebarVisible"
                @showComponent="navigateTo"
            />
            <div class="main-content" :class="{ expanded: isSidebarVisible }">
                <router-view
                    :key="$route.fullPath"
                    :currentComponent="$route.params.component"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Header from './components/dashboard/Header.vue'
import Sidebar from './components/dashboard/Sidebar.vue'
import { EventBus } from './utils/EventBus'

export default {
    components: {
        Header,
        Sidebar,
    },
    data() {
        return {
            currentRole: this.$route.name || 'admin',
            isSidebarVisible: true,
            searchTerm: '',
        }
    },
    watch: {
        '$route.name'(newRole) {
            this.currentRole = newRole
        },
    },
    computed: {
        currentView() {
            return this.currentRole === 'admin' ? AdminView : UserView
        },
    },
    methods: {
        updateRole(role) {
            this.currentRole = role
            this.navigateTo('items')
        },
        navigateTo(component) {
            this.$router.push({ name: this.currentRole, params: { component } })
        },
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible
        },
        handleSearch(newQuery) {
            console.log('Search term:', newQuery)
            if (this.currentRole === 'admin') {
                console.log('Search in admin items')
            } else if (this.currentRole === 'user') {
                console.log('Search in user items')
            }
        },
    },
    mounted() {
        EventBus.on('search', this.handleSearch)
    },
    beforeUnmount() {
        EventBus.off('search', this.handleSearch)
    },
}
</script>

<style scoped>
.app-content {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  font: 1em sans-serif;
  height: 100vh;
  margin-top: 60px;
}

.main-content {
  flex-grow: 1;
  transition: margin-left 0.3s ease;
}

.main-content.expanded {
  margin-left: 200px;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }
}
</style>