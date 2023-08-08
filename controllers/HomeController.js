window.HomeController = function ($scope, $http) {
    $http.get('http://localhost:3000/products')
        .then(res => {
            $scope.products = res.data
        })

    // $scope.addCart = (id) => {
    //     $http.get('http://localhost:3000/products/' + id)
    //         .then(res => {
    //             let product = res.data
    //             let check = true
    //             product = {
    //                 id: product.id,
    //                 qty: 1,
    //                 ten: product.ten,
    //                 gia: product.gia,
    //                 img: product.img
    //             }
    //             $scope.cart.forEach((item, index) => {
    //                 if(item.id == product.id) {
    //                     $scope.cart[index].qty ++
    //                     check = false
    //                 }
    //             });
    //             if(check) {
    //                 $scope.cart.push(product)
    //             }
    //             $scope.$parent.numberCart = $scope.cart.length
    //             $scope.$parent.total = $scope.cart.reduce((acc, cur) => {
    //                 return acc + Number(cur.qty) * Number(cur.gia)
    //             }, 0)
    //         })
    // }



}