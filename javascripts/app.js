function InviteCtrl($scope,$http) {

  // 异步加载数据，初始化$scope
  $http.get('invite_panel.json').then(function(res){
    $scope.data = res.data;
    var invited = $scope.data.invited;
    var recommended = $scope.data.recommended;
    for(var index in $scope.data.invited){
      invited[index].invited = true;
    }
    for(var index in $scope.data.recommended){
      recommended[index].invited = false;
    }
    $scope.users = invited.concat(recommended);
  });

  // 邀请回答/收回邀请
  $scope.trigger_invite = function(target){
    var id = target.getAttribute('data-id');
    var user = $scope.users.filter(function(ele){
      return ele.id == id;
    })[0];
    if(user.invited){
      $scope.data.invited.splice($scope.data.invited.indexOf(user),1);
      $scope.data.recommended.push(user);
    }else{
      $scope.data.recommended.splice($scope.data.invited.indexOf(user),1);
      $scope.data.invited.push(user);
    }
    user.invited = !user.invited;
  };

}