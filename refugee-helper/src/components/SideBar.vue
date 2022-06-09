<template>
    <div class='menu'>
        <button
        v-show ="!menuExpanded"
        class='button buttonClosed'
        @click="buttonClick"
        >≡</button>

        <button
        v-show ="menuExpanded"
        class='button buttonOpened'
        @click="buttonClick"
        >↤</button>
        
        <div v-show="menuExpanded">
            <MenuContent :markers="this.markers"/>
        </div>
    </div>
</template>

<script>
    import MenuContent from './MenuContent.vue'
    export default {
    name: "SideBar",
    props: ["menuExpanded", "markers"],
    methods: {
        buttonClick() {
            this.$emit("update", !this.menuExpanded);
        }
    },
    components: {
        MenuContent 
    }
}
</script>

<style>
    .menu {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #141c24;
        height: 100rem;
    }

    .button {
        background-color: #141c24;
        border: none;
        color: #b28860;
        text-align: center;
        text-decoration: none;
        font-size: 24px;
    }

    
    .inverseButton {
        background-color: #b28860;
        border: none;
        color: #141c24;
        text-align: center;
        text-decoration: none;
        font-size: 24px;
        padding:12px;
    }

    .buttonClosed {
        position: fixed;
        top: 0.50rem;
        left: 1.50vw;
        height: 3rem;
        width: 3rem;
        border-radius: 100%;
    }

    .buttonOpened {
        height: 4rem;
        width: 22vw;
        text-align: left;
        padding-left: 2.75vw;
    }
</style>