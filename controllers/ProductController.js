window.ProductController = function ($scope, $http) {
    // Đọc dữ liệu ra màn hình
    if(localStorage.getItem('user.role') == 1) {
        window.location.assign('#!/')
    }
    var apiURL = 'http://localhost:3000/products';
    $scope.getData = function () {
        $http.get('http://localhost:3000/products')
            .then(response => {
                $scope.res = response.data
            })
    }
    $scope.getData();
    $scope.init = function () {
        // Khai báo dữ liệu mẫu
        $scope.inputValue = {
            ten: '',
            gia: '',
            hang: '1',
            anh: ''
        }
        // Khai báo validate mẫu
        $scope.kiemtradulieu = {
            name: false,
            date: false,
            salary: false
        };
    }
    $scope.init()


    // Validate và tạo dữ liệu mới
    $scope.onSubmit = function () {
        $scope.kiemtradulieu = {
            ten: "",
            gia: "",
            hang: ""
        };
        // var anh = document.querySelector('input[type= "file"]').value
        // console.log(anh)

        let check = true
        if (!$scope.inputValue || !$scope.inputValue.ten) {
            $scope.kiemtradulieu.ten = "Tên sản phẩm không được để trống";
            check = false
        }
        if (!$scope.inputValue || !$scope.inputValue.gia) {
            $scope.kiemtradulieu.gia = "Giá sản phẩm không được để trống";
            check = false
        } else if(isNaN($scope.inputValue.gia)) {
            $scope.kiemtradulieu.gia = "Trường này phải nhập số";
            check = false
        }

        if (check) {
            var newItem = {
                ten: $scope.inputValue.ten,
                gia: $scope.inputValue.gia,
                hang: $scope.inputValue.hang
            }
            $http.post(apiURL, newItem)
                .then(response => {
                    $scope.getData();
                }).catch(error => {
                    console.log(error)
                })
        }
    }


    // Hỏi xóa
    $scope.confirmDelete = function(id){
        $scope.idDelete = id;
    }
    // Xác nhận xóa
    $scope.onDelete = function(){
        if($scope.idDelete != undefined){
            $http.delete(`${apiURL}/${$scope.idDelete}`)
                .then( response => {
                    $scope.getData();
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    // Lấy dữ liệu từ 1 id
    $scope.confirmUpdate = function(id){
        $scope.init();
        $http.get(`${apiURL}/${id}`)
            .then( response => {
                var product = response.data
                product.hang = String(product.hang)
                $scope.inputValue = product
                $scope.idUpdate = id
            }).catch(error => {
                console.log(error)
            })
    }

    // Cập nhật dữ liệu
    $scope.onUpdate = function(){
        $scope.kiemtradulieu = {
            ten: "",
            gia: "",
            hang: ""
        };
        // var anh = document.querySelector('input[type= "file"]').value
        // console.log(anh)

        let check = true
        if (!$scope.inputValue || !$scope.inputValue.ten) {
            $scope.kiemtradulieu.ten = "Tên sản phẩm không được để trống";
            check = false
        }
        if (!$scope.inputValue || !$scope.inputValue.gia) {
            $scope.kiemtradulieu.gia = "Giá sản phẩm không được để trống";
            check = false
        } else if(isNaN($scope.inputValue.gia)) {
            $scope.kiemtradulieu.gia = "Trường này phải nhập số";
            check = false
        }

        if (check) {
            var newItem = {
                ten: $scope.inputValue.ten,
                gia: $scope.inputValue.gia,
                hang: $scope.inputValue.hang
            }
            $http.put(apiURL+"/"+$scope.idUpdate, newItem)
                .then(response => {
                    $scope.getData();
                }).catch(error => {
                    console.log(error)
                })
        }
    }
}

