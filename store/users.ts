import {acceptHMRUpdate, defineStore} from "pinia";
import {LOAD_USERS} from "../services/api";

type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

type State = {
    users: User[],
    sortings: {
        key: string | null,
        value: string | null
    },
    filters: {
        name: string | null,
        email: string | null,
        phone: string | null,
        username: string | null,
        website: string | null
    },
    loading: boolean
}


export const useUsersStore = defineStore('useUsersStore', {
    state: (): State => ({
        users: [],
        sortings: {
            key: null,
            value: null
        },
        filters: {
            name: null,
            email: null,
            phone: null,
            username: null,
            website: null
        },
        loading: false
    }),
    actions: {
        async loadUsers() {
            this.setLoading(true)
            const params: Record<string, string> = {}
            if (this.sortings.value) {
                params._sort = this.sortings.key
                params._order = this.sortings.value
            }
            Object.keys(this.filters).map(key => {
                if (this.filters[key] && this.filters[key] !== '') {
                    params[`${key}_like`] = this.filters[key]
                }
            })
            // @ts-ignore
            await LOAD_USERS(params).then((r: { data: Array }) => {
                this.users.splice(0, this.users.length)
                r.data.map((user: object) => {
                    this.users.push(user)
                })
            })
            this.setLoading(false)
        },
        async changeSort(key: string, val: any) {
            this.sortings.key = key
            this.sortings.value = val
            await this.loadUsers()
        },
        async changeFilter(key: string, val: any) {
            // @ts-ignore
            this.filters[key] = val
            await this.loadUsers()
        },
        setLoading(val: boolean) {
            this.loading = val
        }
    },
    getters: {
        getUsers: state => state.users,
        getFilters: state => state.filters,
        getLoading: state => state.loading,
        getSortings: state => state.sortings
    }
})

if (import.meta.hot) {
    import.meta?.hot?.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}