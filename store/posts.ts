import {acceptHMRUpdate, defineStore} from "pinia";
import {LOAD_POSTS} from "../services/api";

type Post = {
    userId: number,
    id: number,
    title: string,
    body: string
}

type State = {
    posts: Post[],
    pagination: {
        page: number,
        total: number,
        per_page: number
    },
    loading: boolean,
    filters: {
        title: string | null,
        body: string | null
    }
}

export const usePostsStore = defineStore('usePostsStore', {
    state: (): State => ({
        posts: [],
        pagination: {
            page: 1,
            total: 0,
            per_page: 6
        },
        loading: false,
        filters: {
            'title': null,
            'body': null
        }
    }),
    actions: {
        async loadPosts() {
            this.setLoading(true)
            const params: Record<string, string> = {}
            Object.keys(this.filters).map(key => {
                if (this.filters[key] && this.filters[key] !== '') {
                    params[`${key}_like`] = this.filters[key]
                }
            })
            params._page = this.pagination.page
            params._limit = this.pagination.per_page
            // @ts-ignore
            await LOAD_POSTS(params).then((r: any) => {
                this.pagination.total = parseInt(r.headers['x-total-count'])
                this.posts.splice(0, this.posts.length)
                r.data.map((post: object) => {
                    this.posts.push(post)
                })
            })
            this.setLoading(false)
        },
        async changePage(page: number) {
            this.pagination.page = page
            await this.loadPosts()
        },
        setLoading(val: boolean) {
            this.loading = val
        },
        async changeFilter(key: string, val: string) {
            // @ts-ignore
            this.filters[key] = val
            await this.loadPosts()
        },
    },
    getters: {
        getPosts: state => state.posts,
        getLoading: state => state.loading,
        getPagination: state => state.pagination,
        getFilters: state => state.filters,
        totalPages: state => state.pagination.total / state.pagination.per_page
    }
})

if (import.meta.hot) {
    import.meta?.hot?.accept(acceptHMRUpdate(usePostsStore, import.meta.hot))
}