App.controller('app',['$scope','$ocLazyLoad', function($scope, $ocLazyLoad){
	$scope.loadBootstrap = function(){
		var myFileList=[];
		myFileList=loadFileList(myFileList);
		//console.log("要加载的文件:"+myFileList);
        $ocLazyLoad.load(myFileList)  
    }
    
    $scope.loadBootstrap();
  	
  	$scope.tableList=[];
  	
  	$scope.initTalbe=function()
  	{
  		 $('#example').DataTable( {
        	"ajax": "data/arrays.txt"
    	});
  	}
  	
  	
  	
  	
}]);
