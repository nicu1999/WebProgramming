<template>
    <div class='menuContent'>
        <div v-if="!isAuthenticated">
            <h1> Please <br>Login</h1>
            <h3> If you are logged in<br>you can suggest<br>waypoints or<br>add comments<br>and ratings</h3>
        </div>
        <div v-else>
            <div v-if="user != undefined">
                <img :src="userpicture" alt="User Profile Picture" class="image">
                <h2 v-if="roles.includes('User')">Hello,<br>{{username}}</h2>
                <h2 v-if="roles.includes('Admin')">Hello admin,<br>{{username}}</h2>
                <button v-if="roles.includes('Admin')" class="inverseButton roundedBorder" @click="pressButton">View<br>Waypoints</button>
                <WaypointMenu v-if="isButtonPressed" :markers="this.markers" @dismissWaypointMenu="isButtonPressed = false"/>
            </div>
            <div v-else>
                <h1> Loading... </h1>
            </div>
        </div>
        <LoginApp 
        @userLoggedIn="loginStateChange"
        @userData="userDataChange"
        />
    </div>
</template>

<script>
import LoginApp from './LoginApp.vue'
import WaypointMenu from './WaypointMenu.vue'

export default {
    name: "MenuContent",
    props: ["markers"],
    components: { LoginApp, WaypointMenu },

    data() {
        return {
            username: 'defaultUsername',
            userpicture: null,
            roles: null,
            isButtonPressed: false,
        }
    },

    computed: {
        isAuthenticated() {
            return this.$store.getters.getIsAuthenticated
        },

        user() {
            return this.$store.getters.getUser
        }
    },

    watch: {
        user(newState) {
            if(newState != undefined) {
                this.username = newState.nickname
                this.userpicture = newState.picture
                this.roles = newState['https://refugee-helper/roles']
            }
        },
    },

    methods: {
        pressButton(){
            this.isButtonPressed = true
        }
    }

}
</script>

<style>
    .menuContent {
        padding-left: 2.3vw;
        margin-right: 1vw;
    }

    .image {
        width: 5rem;
        height: 5rem;
    }

    .roundedBorder {
        border-radius: 2px;
    }
    
</style>