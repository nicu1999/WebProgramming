<template>

<div class= "popup menuContent roundedBorderMenu shadow" :style="location" >

    <div v-if="returnUser['https://refugee-helper/roles'].includes('Admin')">

        <button class="inverseButton roundedBorder buttonPosition" @click="addWaypoint" v-if="!isButtonClicked">Add Waypoint</button>
        
        <div  v-if="isButtonClicked" class="positionInMenu">
            <h2> Add new waypoint </h2>
            <input v-model="waypointTitle" placeholder="add waypoint title"/> <br>

            <input type="radio" id="one" value="friendly" v-model="waypointType" />
            <label for="friendly">Friendly</label>

            <input type="radio" id="two" value="dangerous" v-model="waypointType" />
            <label for="dangerous">Dangerous</label> <br>

            <div v-if="waypointType === 'dangerous'">
                <input v-model="waypointDangerouseRadius" placeholder="add dangerouse radius"/> <br>
            </div>

            <div class="attribute-block">
                <input type="checkbox" id="atr1" value="Atr1" v-model="waypointAttributesList">
                <label for="atr1">Atr1</label> <br>
                <input type="checkbox" id="atr2" value="Atr2" v-model="waypointAttributesList">
                <label for="atr2">Atr2</label><br>
                <input type="checkbox" id="atr3" value="Atr3" v-model="waypointAttributesList">
                <label for="atr3">Atr3</label><br>
            </div> <br>

            <input v-model="waypointDescription" placeholder="add waypoint description"/><br>
            <button class="inverseButton roundedBorder" @click="postWaypoint">Add</button>
        </div>
    
    </div>

  <div v-else-if="returnUser['https://refugee-helper/roles'].includes('User')">
        <button class="inverseButton roundedBorder buttonPosition" @click="addWaypoint" v-if="!isButtonClicked">Email Admin</button>

        <div  v-if="isButtonClicked" class="positionInMenu">
            <h3> Email admin waypoint location and a description</h3>
            <textarea v-model="adminEmail" placeholder="add waypoint title" class="text-area"/>
            <button class="inverseButton roundedBorder" @click="sendEmail">Send Email</button>
        </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    props: {
        x: Number,
        default: 0,
        y: Number,
        default: 0,
        lat: Number,
        default: 0,
        lng: Number,
        default: 0,
    },
    
    setup() {
      const { getAccessTokenSilently } = useAuth0();

      return {
        getToken: async () => {
          return await getAccessTokenSilently();
        }
      };
    },

    async created (){
        this.token = await this.getToken()
    },

    data() {
        return {
            isButtonClicked : false,
            waypointType : 'friendly',
            waypointTitle: '',
            waypointAttributesList: [],
            waypointDangerouseRadius: 0,
            waypointDescription: '',
            token: null,
            response: null,
            adminEmail: '',
        }
    },

    computed: {
      location () {
        return 'top: ' + (this.y - 294.154) + 'px; left: ' + this.x + 'px;'
      },

      returnUser() {
        return this.$store.getters.getUser
      }
    },

    methods: {
        addWaypoint(){
            this.isButtonClicked = true
        },

        postWaypoint() {
            axios.post('http://localhost:6001/admin', {
                waypointType: this.waypointType,
                waypointTitle: this.waypointTitle,
                waypointAttributesList: this.waypointAttributesList,
                waypointDangerouseRadius: this.waypointDangerouseRadius,
                waypointDescription: this.waypointDescription,
                position: {
                    lng : this.lng,
                    lat : this.lat
                }
            },
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token 
                }
            })
            .then(response => {
            this.response = response.data
            window.location.reload()
            })
            .catch(e => {
            this.errors.push(e)})
        },

        sendEmail() {
                axios.post('http://localhost:6001/user/emailadmin', {
                position: {
                    lng : this.lng,
                    lat : this.lat
                },
                adminEmail : this.adminEmail,
                user: this.returnUser.nickname
            },
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token 
                }
            })
            .then(response => {
            //this.response = response.data
            console.log(response.data)
            window.location.reload()
            })
            .catch(e => {
            this.errors.push(e)})
        }


    },

    watch: {
        isButtonClicked(){
        }
    },
}
</script>

<style scoped>
    .popup {
        background-color: #141c24;
        color: #b28860;
        position:absolute;
        height: 18.3846rem;
        width: 13rem;

    }
    .roundedBorderMenu {
        border-radius: 5%;
    }

    .buttonPosition {
        position: relative;
        top: 2rem;
    }

    .shadow {
        box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
    }

    .positionInMenu {
        position: relative;

    }

    .text-area{
        height:7rem;
        width:10rem;
        overflow:auto;
        resize: none;
    }

    .attribute-block{
        height:3rem;
        width:10rem;
        overflow:auto;
    }
</style>