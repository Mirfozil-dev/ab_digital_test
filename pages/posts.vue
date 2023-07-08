<script setup lang="ts">
import {usePostsStore} from "../store/posts";

const postsStore = usePostsStore()

await postsStore.loadPosts()

function changeFilters(key, e) {
    if (typeof window.LIT !== 'undefined') {
        clearTimeout(window.LIT);
    }
    window.LIT = setTimeout(() => {
        postsStore.changeFilter(key, e.target.value)
    }, 2000);
}
</script>
<template>
    <div class="d-flex align-center w-100 flex-wrap justify-center" style="gap: 20px; padding: 60px 0;">
        <div class="w-100 d-flex justify-center">
            <div style="width: 1240px; gap: 20px" class="d-flex">
                <v-text-field
                    variant="outlined" color="blue" label="Title"
                    @input="e => changeFilters('title', e)"
                    :model-value="postsStore.getFilters.title"
                />
                <v-text-field
                    variant="outlined" color="blue" label="Body"
                    @input="e => changeFilters('body', e)"
                    :model-value="postsStore.getFilters.body"
                />
            </div>
        </div>
        <v-progress-circular v-if="postsStore.getLoading" :indeterminate="true" color="blue" />
        <template v-else>
            <NuxtLink
                v-for="post in postsStore.posts"
                :key="post.id"
                :to="`/post?id=${post.id}`"
            >
                <v-card
                    width="400"
                    height="160"
                    style="cursor: pointer;"
                >
                    <template v-slot:title>
                        {{ post.title }}
                    </template>
                    <template v-slot:text>
                        {{ post.body }}
                    </template>
                </v-card>
            </NuxtLink>
            <div class="w-100">
                <v-pagination
                    @update:modelValue="val => postsStore.changePage(val)"
                    :length="postsStore.totalPages"
                    :model-value="postsStore.getPagination.page"
                    color="blue"
                ></v-pagination>
            </div>
        </template>

    </div>
</template>

<style scoped lang="scss">
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

a {
    color: white;
    text-decoration: none;

    &.router-link-active {
        text-decoration: underline;
    }
}

</style>