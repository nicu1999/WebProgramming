<template>
        <div class="backGround" @click="$emit('dismissWaypointMenu')">
        </div>
        <div class="menuPopup shadow roundedBorderMenu">
            <h1 class="contentPosition"> Waypoint Menu </h1>
            <div style="overflow:auto; max-height: 70%; padding-left: 1rem; padding-right: 1rem;">
                <div v-for="marker in markers" :key="marker" class="">
                    <code> Id: {{marker.id}} Lat: {{marker.position.lat}} Lng: {{marker.position.lng}}</code>
                    <code> Title: {{marker.waypointTitle}} Descr: {{marker.waypointDescription}}</code>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    props:["markers"]
}
</script>

<style>

.menuPopup {
    position: fixed;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    background-color: #141c24;
    opacity: 1;
    z-index: 2;
}

.backGround{
    position: fixed;
    background-color: gray;
    opacity: 0.5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.shadow {
    box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
}

.roundedBorderMenu {
    border-radius: 10px;
}

.contentPosition {
    position: relative;
    top: 1rem;
    left: 2rem;
}

</style>