<template id="google-loader-template">
    <div class="ui segment" style="width:auto; height:auto">
        <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" />
            </svg>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Capa-Loading',
}
</script>

<style lang="sass">
$green: #008744
$blue: #0057e7
$red: #d62d20
$yellow: #ffa700
$white: #eee

$width: 100px

body
  background-color: $white

#App
  height: 100%
  width: 100%

.loader
  position: relative
  margin: calc(5vh - 10px) auto
  width: $width
  &::before
    content: ''
    display: block
    padding-top: 100%

  .circular
    animation: rotate 0.4s linear infinite
    height: 100%
    transform-origin: center center
    width: 100%
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    margin: auto

    .path
      stroke-dasharray: 1, 200
      stroke-dashoffset: 0
      animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite
      stroke-linecap: round

@keyframes rotate
  100%
    transform: rotate(360deg)

@keyframes dash
  0%
    stroke-dasharray: 1, 200
    stroke-dashoffset: 0
  50%
    stroke-dasharray: 89, 200
    stroke-dashoffset: -35px
  100%
    stroke-dasharray: 89, 200
    stroke-dashoffset: -124px

@keyframes color
  100%,
  0%
    stroke: $red
  40%
    stroke: $blue
  66%
    stroke: $green
  80%,
  90%
    stroke: $yellow
</style>


