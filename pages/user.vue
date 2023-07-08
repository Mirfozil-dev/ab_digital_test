<script setup lang="ts">
import {useRoute} from 'vue-router'
import {LOAD_USER} from "../services/api";
import {reactive} from 'vue'

const route = useRoute()
const id = route.query.id
let data = reactive({});

onMounted(() => {
    LOAD_USER(id).then(r => {
        if (r.data) {
            Object.assign(data, r.data)
        }
    })
})


</script>

<template>
    <div class="w-100" style="padding: 60px 20px;">
        <v-card class="d-flex flex-wrap" style="padding: 20px">
            <div class="w-25 d-flex align-center justify-center">
                <img
                    style="width: 200px;"
                    src="../assets/images/user.png"
                    class="text-white"
                />
            </div>
            <template v-if="Object.keys(data).length > 0">
                <div class="w-25">
                    <v-card-title style="font-size: bold; padding-bottom: 20px;">
                        General information
                    </v-card-title>
                    <v-card-text>{{ data.name }}</v-card-text>
                    <v-card-text>{{ data.email }}</v-card-text>
                    <v-card-text>{{ data.phone }}</v-card-text>
                    <v-card-text>{{ data.username }}</v-card-text>
                    <v-card-text>
                        <a target="_blank" :href="`https://www.${data.website}`">{{ data.website }}</a>
                    </v-card-text>
                </div>
                <div class="w-25">
                    <v-card-title style="font-size: bold; padding-bottom: 20px;">
                        Company
                    </v-card-title>
                    <template v-if="Object.keys(data.company).length > 0">
                        <v-card-text>{{ data.company.name }}</v-card-text>
                        <v-card-text>{{ data.company.bs }}</v-card-text>
                        <v-card-text>{{ data.company.catchPhrase }}</v-card-text>
                    </template>
                </div>
                <div class="w-25">
                    <v-card-title style="font-size: bold; padding-bottom: 20px;">
                        Address
                    </v-card-title>
                    <template v-if="Object.keys(data.address).length > 0">
                        <v-card-text>{{ data.address.city }}</v-card-text>
                        <v-card-text>{{ data.address.street }}</v-card-text>
                        <v-card-text>{{ data.address.suite }}</v-card-text>
                        <v-card-text>{{ data.address.zipcode }}</v-card-text>
                    </template>
                </div>
                <iframe
                    style="margin-top: 50px;"
                    width="100%"
                    height="250"
                    :src="`https://maps.google.com/maps?q=${data.address.geo.lat},${data.address.geo.lng}&hl=es;z=14&amp;output=embed`"></iframe>
            </template>
        </v-card>
    </div>
</template>

<style scoped>
.v-card .v-card-text {
    line-height: .5rem;
}
</style>