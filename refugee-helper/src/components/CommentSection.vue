<template>
    <div>
        <input class="input" v-model="usercomment" placeholder="add comment..."/>
        <button @click="postcomment">post</button>
        <div class="comment-section">
            <ul v-if=" (comments.length != 0) && show_comments" class="comment-box" >
                <li v-for="comment in comments" :key="comment">
                    {{comment.comment}}
                </li>
            </ul>
            <div  v-if=" (comments.length == 0) && show_comments" class="comment-box">
                <span>There is nobody here! Be the first to leave a comment!</span>
            </div>
        </div>
        <button class="showhidecomments" @click="showcomments">
            <div v-if="!show_comments">Show Comments</div>
            <div v-if="show_comments">Hide Comments</div>
        </button>
    </div>
</template>

<script>
import axios from 'axios'
import { useAuth0} from '@auth0/auth0-vue';

export default {
    props: ['id'],

    data(){
        return {
            usercomment : '',
            comments: [],
            show_comments: false
        }
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

    methods: {
        postcomment(){
            axios.post('http://localhost:6001/user/postcomment', {
                idWaypoint: this.id,
                comment: this.usercomment
            },
            {
                headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token 
                }
            })
            .then(response => {
                console.log(response.data)
            })
            .catch(e => {
                this.errors.push(e)})
        },

        showcomments() {
            if(this.show_comments == false) {
                axios.get('http://localhost:6001/user/comments/' + this.id,
                {
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token 
                    }
                })
                .then(response => {
                    console.log(response.data)
                    this.comments = response.data
                })
                .catch(e => {
                    this.errors.push(e)})

                this.show_comments = true
            } else {
                this.show_comments = false
            }
        },            
        
    },
}

</script>

<style scoped>

.input{
    width:70%;
}

.button{
    width:30%;
}

.comment-section{
    width:95%;
    max-height:7rem;
    overflow:auto;
}

.comment-box {
    list-style-type:none;
    margin: 5%; 
    padding: 0;
}

.showhidecomments {
     width:95%;
}

</style>