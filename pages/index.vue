<script setup lang="ts">
import {useUsersStore} from "../store/users";
import {useRouter} from "vue-router";

const usersStore = useUsersStore()
const router = useRouter()

onMounted(() => {
    usersStore.loadUsers()
})

function showSingleUser(id) {
    router.push({name: 'user', query: {id}})
}

function changeSort(key) {
    const sortVal = usersStore.getSortings.value
    let result;
    switch (sortVal) {
        case 'asc':
            result = 'desc'
            break;
        case 'desc':
            result = null
            break;
        case null:
        case undefined:
            result = 'asc'
            break;
    }
    usersStore.changeSort(key, result)
}

function getIcon(key) {
    const sortVal = usersStore.getSortings.value
    let result;
    if (key === usersStore.getSortings.key) {
        switch (sortVal) {
            case 'asc':
                result = 'fa-sort-up'
                break;
            case 'desc':
                result = 'fa-sort-down'
                break;
            case null:
            case undefined:
                result = 'fa-sort'
                break;
        }
    } else {
        result = 'fa-sort'
    }
    return result
}

function changeFilters(key, e) {
    if (typeof window.LIT !== 'undefined') {
        clearTimeout(window.LIT);
    }
    window.LIT = setTimeout(() => {
        usersStore.changeFilter(key, e.target.value)
    }, 2000);
}

</script>
<template>
    <div class="d-flex justify-center align-center w-100 flex-column" style="padding: 60px 0;">
        <div class="w-100 d-flex justify-end" style="max-width: 930px; gap: 20px;">
            <v-text-field
                label="Name" variant="outlined" color="blue"
                @input="e => changeFilters('name', e)"
                :model-value="usersStore.getFilters.name"
            />
            <v-text-field
                label="Email" variant="outlined" color="blue"
                @input="e => changeFilters('email', e)"
                :model-value="usersStore.getFilters.email"
            />
            <v-text-field
                label="Phone" variant="outlined" color="blue"
                @input="e => changeFilters('phone', e)"
                :model-value="usersStore.getFilters.phone"
            />
            <v-text-field
                label="Username" variant="outlined" color="blue"
                @input="e => changeFilters('username', e)"
                :model-value="usersStore.getFilters.username"
            />
            <v-text-field
                label="Website" variant="outlined" color="blue"
                @input="e => changeFilters('website', e)"
                :model-value="usersStore.getFilters.website"
            />
        </div>
        <v-progress-circular v-if="usersStore.getLoading" :indeterminate="true" color="blue" />
        <v-table v-else>
            <thead>
            <tr>
                <th class="text-left">
                    Name
                    <v-icon @click="changeSort('name')" :icon="`fas ${getIcon('name')}`" size="x-small" />
                </th>
                <th class="text-left">
                    Email
                    <v-icon @click="changeSort('email')" :icon="`fas ${getIcon('email')}`" size="x-small" />
                </th>
                <th class="text-left">
                    Phone
                    <v-icon @click="changeSort('phone')" :icon="`fas ${getIcon('phone')}`" size="x-small" />
                </th>
                <th class="text-left">
                    Username
                    <v-icon @click="changeSort('username')" :icon="`fas ${getIcon('username')}`" size="x-small" />
                </th>
                <th class="text-left">
                    Website
                    <v-icon @click="changeSort('website')" :icon="`fas ${getIcon('website')}`" size="x-small" />
                </th>

            </tr>
            </thead>
            <tbody>
            <tr
                v-for="user in usersStore.getUsers"
                :key="user.id"
                @click="showSingleUser(user.id)"
                style="cursor:pointer;"
                class="my-row"
            >
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.website }}</td>
            </tr>
            </tbody>
        </v-table>
    </div>
</template>

<style scoped lang="scss">
.my-row {
    transition: .3s;

    &:hover {
        background: #dcdcdc;
    }
}
</style>