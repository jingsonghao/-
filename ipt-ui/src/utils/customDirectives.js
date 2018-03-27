var auth = {
  bind: function (el, binding, vnode) {
    console.info(el)
    console.info(binding.value)
    // 想办法取到 $store
    console.info(vnode.componentInstance)
    // if (...){
    //     el.parentNode.removeChild(el)
    // }
    el.parentNode.removeChild(el)
  }
}
// var other = {bind: function(el, binding, vnode){}}
function customDirectives (Vue) {
  Vue.directive('auth', auth)
  //Vue.directive('other', other)
}

export default customDirectives
