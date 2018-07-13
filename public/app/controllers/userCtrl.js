angular.module('userControllers', []).controller('regCtrl', function($http, $location, $timeout){
    
    this.regUser = (regData)=>{
        this.errorMsg = false
        this.loading = true
        $http.post('api/users', this.regData).then(data=>{
            console.log(data.data, 'testing fucking button')
            if(data.data.success){
                this.loading = false
                this.successMsg = data.data.message
                $timeout(()=>{
                    $location.path('/')
                },2000)      
            }else{
                this.loading = false
                this.errorMsg = data.data.message
            }
        })
    }
})