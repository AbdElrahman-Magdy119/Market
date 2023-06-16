<template>
    <div class="card">
        <div class="flex flex-wrap justify-content-center gap-2 mb-2">
            <Button label="Right" icon="pi pi-arrow-left" @click="openPosition('right')" severity="help" style="min-width: 10rem" />
        </div>
        <Dialog v-model:visible="visible" header="Header" :style="{ width: '50vw' }" :position="position" :modal="true" :draggable="false">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="visible = false" text />
                <Button label="Yes" icon="pi pi-check" @click="visible = false" autofocus />
            </template>
        </Dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            position: 'center',
            visible: false
        };
    },
    methods: {
        openPosition(position) {
            this.position = position;
            this.visible = true;
        }
    }
};
</script>