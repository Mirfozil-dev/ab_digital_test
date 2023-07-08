<template>
    <NuxtLayout>
        <v-layout>
            <v-app-bar
                color="blue"
                class="main-nav px-5"
            >
                <v-app-bar-title>My Blog</v-app-bar-title>

                <v-spacer />
                <NuxtLink to="/">
                    <v-btn>
                        Users
                    </v-btn>
                </NuxtLink>
                <NuxtLink to="/posts">
                    <v-btn>
                        Posts
                    </v-btn>
                </NuxtLink>
            </v-app-bar>
            <NuxtPage style="margin-top: 65px;" />
        </v-layout>
    </NuxtLayout>
</template>

<style lang="scss">
.main-nav {
    a {
        color: white;
        text-decoration: none;

        &.router-link-active {
            .v-btn {
                .v-btn__content {
                    text-decoration: underline !important;
                }
            }
        }
    }
}
</style>