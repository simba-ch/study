export default {
  namespaced:true,
  state(){
    return {
      a:'a',
      name:'a'
    }
  },
  mutations:{
    changeA(state:any){
      state.a = 'b'
    }
  }
}