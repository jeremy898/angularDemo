function addFn(a, b) {
    var lenA = a.length
    var lenB = b.length
    var len = lenA > lenB ? lenA : lenB
    if (lenA > lenB) {
      for (var i = 0; i < lenA - lenB; i++) {
        b = '0' + b
      }
    } else {
      for (var i = 0; i < lenB - lenA; i++) {
        a = '0' + a
      }
    }
    // console.log(a)
    // console.log(b)
    var arrA = a.split('').reverse()
    var arrB = b.split('').reverse()
    // console.log(arrA)
    // console.log(arrB)
    var arr = []
    for (i = 0; i < len; i++) {
      arr.push(parseInt(arrA[i]) + parseInt(arrB[i]))
    }
    console.log(arr)
    for (i = 0; i < arr.length; i++) {
      if (arr[i] >= 10) {
        arr[i] -= 10
        arr[i + 1] = parseInt(arr[i + 1]) + 1
      }
    }

    return arr.reverse().join('')
  }
  [ 15,15,15,15,15,15,15,15,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,5,4,3,2,1 ]

  console.log(addFn('1234599999999999999999999999999999', '66666666'))