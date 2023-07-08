<script setup lang="ts">
import {useRoute} from "vue-router";
import {reactive} from "vue";
import {LOAD_POST} from "../services/api";

const route = useRoute()
const id = route.query.id
let data = reactive({});

onMounted(() => {
    LOAD_POST(id).then(r => {
        if (r.data) {
            Object.assign(data, r.data)
        }
    })
})
</script>

<template>
    <div class="w-100" style="padding: 60px 20px;">
        <v-card class="d-flex flex-column" style="padding: 20px">
            <template v-slot:title>
                {{ data.title }}
            </template>
            <template v-slot:text>
                {{ data.body }}
            </template>
        </v-card>
    </div>
</template>