<template>
  <div style="margin-top:10rem">
    <div class="d-flex justify-content-start category">
        <Sidebar v-model:visible="visible">
            <h2>Sidebar</h2>
            <Tree :value="nodes" class="w-full md:w-30rem"></Tree>
        </Sidebar>
        <Button class="AllCategoryButton " label="AllCategory" @click="visible = true" />
    </div>
  </div>
</template>

<script>
import Sidebar from 'primevue/sidebar';
import Button from 'primevue/button';
import Tree from 'primevue/tree';
export default {
  components:{
    Sidebar,
    Button,
    Tree
  },
  data() {
        return {
            visible: false,
            nodes: [
                {
                    key: '0',
                    label: 'Documents',
                    data: 'Documents Folder',
                    icon: 'pi pi-fw pi-inbox',
                    children: [
                        {
                            key: '0-0',
                            label: 'Work',
                            data: 'Work Folder',
                            icon: 'pi pi-fw pi-cog',
                            children: [
                                { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                                { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
                            ]
                        },
                        {
                            key: '0-1',
                            label: 'Home',
                            data: 'Home Folder',
                            icon: 'pi pi-fw pi-home',
                            children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
                        }
                    ]
                },
                {
                    key: '1',
                    label: 'Events',
                    data: 'Events Folder',
                    icon: 'pi pi-fw pi-calendar',
                    children: [
                        { key: '1-0', label: 'Meeting', icon: 'pi pi-fw pi-calendar-plus', data: 'Meeting' },
                        { key: '1-1', label: 'Product Launch', icon: 'pi pi-fw pi-calendar-plus', data: 'Product Launch' },
                        { key: '1-2', label: 'Report Review', icon: 'pi pi-fw pi-calendar-plus', data: 'Report Review' }
                    ]
                },
                {
                    key: '2',
                    label: 'Movies',
                    data: 'Movies Folder',
                    icon: 'pi pi-fw pi-star-fill',
                    children: [
                        {
                            key: '2-0',
                            icon: 'pi pi-fw pi-star-fill',
                            label: 'Al Pacino',
                            data: 'Pacino Movies',
                            children: [
                                { key: '2-0-0', label: 'Scarface', icon: 'pi pi-fw pi-video', data: 'Scarface Movie' },
                                { key: '2-0-1', label: 'Serpico', icon: 'pi pi-fw pi-video', data: 'Serpico Movie' }
                            ]
                        },
                        {
                            key: '2-1',
                            label: 'Robert De Niro',
                            icon: 'pi pi-fw pi-star-fill',
                            data: 'De Niro Movies',
                            children: [
                                { key: '2-1-0', label: 'Goodfellas', icon: 'pi pi-fw pi-video', data: 'Goodfellas Movie' },
                                { key: '2-1-1', label: 'Untouchables', icon: 'pi pi-fw pi-video', data: 'Untouchables Movie' }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped>
.category{
  margin-left: 2rem;
}

.AllCategoryButton{
    font-size: 35px;
    width: 30rem;
    background-color: #3bb77e;
    margin: 5px;
}

.AllCategoryButton:hover{
  background-color: #ffba43;
}
.p-button{
 /* background-color:white; */
 border: 0;
}

</style>