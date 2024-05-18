// 10 possible image groups
const availableImages = [
    [
        "https://cdn.pixabay.com/photo/2016/06/24/10/47/house-1477041_640.jpg",
        "https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685521_640.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_640.jpg",
        "https://cdn.pixabay.com/photo/2016/12/30/07/59/kitchen-1940174_640.jpg",
    ],
    [
        "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_640.jpg",
        "https://cdn.pixabay.com/photo/2017/01/07/17/48/interior-1961070_640.jpg",
        "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401_640.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/15/54/apartment-1835482_640.jpg",
    ],
    [
        "https://cdn.pixabay.com/photo/2016/11/29/03/53/house-1867187_640.jpg",
        "https://cdn.pixabay.com/photo/2017/08/27/10/16/interior-2685522_640.jpg",
        "https://cdn.pixabay.com/photo/2020/11/24/11/36/bedroom-5772286_640.jpg",
        "https://cdn.pixabay.com/photo/2017/03/22/17/39/kitchen-2165756_640.jpg",
    ],
    [
        "https://cdn.pixabay.com/photo/2017/11/16/19/29/cottage-2955582_640.jpg",
        "https://cdn.pixabay.com/photo/2017/07/09/03/19/home-2486092_640.jpg",
        "https://cdn.pixabay.com/photo/2014/07/31/21/41/apartment-406901_640.jpg",
        "https://cdn.pixabay.com/photo/2016/11/08/09/47/logs-1807830_640.jpg",
    ],
    [
        "https://cdn.pixabay.com/photo/2017/03/30/04/14/house-2187170_640.jpg",
        "https://cdn.pixabay.com/photo/2015/04/18/13/23/living-room-728731_640.jpg",
        "https://cdn.pixabay.com/photo/2018/07/14/17/19/interior-3538020_640.jpg",
        "https://cdn.pixabay.com/photo/2022/10/04/14/19/plant-7498330_1280.jpg",
    ],
    [
        "https://cdn.pixabay.com/photo/2022/01/26/04/47/house-6967908_640.jpg",
        "https://cdn.pixabay.com/photo/2015/04/18/13/23/living-room-728736_640.jpg",
        "https://cdn.pixabay.com/photo/2018/01/24/15/08/live-3104077_640.jpg",
        "https://cdn.pixabay.com/photo/2018/08/15/20/53/bathtub-3609070_640.jpg",
    ],
    [
        "https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271_640.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_640.jpg",
        "https://cdn.pixabay.com/photo/2021/11/08/00/30/bedroom-6778193_640.jpg",
        "https://cdn.pixabay.com/photo/2017/03/28/12/15/chairs-2181977_640.jpg",
    ],
    [
        "https://cdn.pixabay.com/photo/2021/03/22/21/04/house-6115719_640.jpg",
        "https://cdn.pixabay.com/photo/2017/03/19/01/43/living-room-2155376_640.jpg",
        "https://cdn.pixabay.com/photo/2016/11/22/19/11/brick-wall-1850095_640.jpg",
        "https://cdn.pixabay.com/photo/2017/01/09/12/08/room-1966383_640.jpg",
    ],
    [
        "https://cdn.pixabay.com/photo/2013/10/09/02/27/lake-192990_640.jpg",
        "https://cdn.pixabay.com/photo/2017/08/02/20/54/home-2573375_640.png",
        "https://cdn.pixabay.com/photo/2021/08/27/01/33/bedroom-6577523_640.jpg",
        "https://cdn.pixabay.com/photo/2016/04/18/08/51/bathroom-1336167_640.jpg",
    ],
    [
        "https://cdn.pixabay.com/photo/2024/04/18/19/01/house-8704811_640.jpg",
        "https://cdn.pixabay.com/photo/2014/12/27/14/37/living-room-581073_640.jpg",
        "https://cdn.pixabay.com/photo/2014/07/10/17/17/bedroom-389254_640.jpg",
        "https://cdn.pixabay.com/photo/2016/10/13/09/08/travel-1737171_640.jpg",
    ],
]

// not 100% random - based on the first letter of the property name
export const getRandomImages = (propertyName: string): string[] => {
    // get a number from 1-26, 'a' = 1, 'z' = 26
    // -9 because parseInt goes 0,1,2,3,4,5,...,a,b,c,d,e and i dont care about numbers, shoutout to stack overflow
    const firstLetterNum = parseInt(propertyName.charAt(0), 36) - 9;
    const index = firstLetterNum % availableImages.length;

    return availableImages[index];
}