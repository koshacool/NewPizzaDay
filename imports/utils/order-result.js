export const getObjFromArr = (arr, paramName, value) => arr.filter( obj => obj[paramName] === value )[0];

export const totalPrice = (orders, food, event) => {
    const confirmedOrders = getConfirmedOrders(orders);

    return orders.map((order) => {
            const foodInfoArr = order.food.map( (foodId) => getObjFromArr(food, '_id', foodId) );//Get array of food objects

            //Get total price for each ordered food
            return foodInfoArr.reduce((sum, foodItem) => {
                const discount = getDiscount(event, foodItem);
                const quantity = getQuantity(order, foodItem);

                const price = (foodItem.price - discount) * quantity;
                return sum + price;
            }, 0);
        })
        .reduce((sum, current) => sum + current, 0)
        .toFixed(2);
};

export const detailedUsersPrice = (orders, users, food, event) => {
    const confirmedOrders = getConfirmedOrders(orders);

    const usersOrders =  getOrdersForMail(confirmedOrders, users, food, event);

    return usersOrders;
};


export const getConfirmedOrders = (orders) => {
    return orders.filter(order => order.status);
};

export const getOrdersForMail = (orders, users, food, event) => {
    return orders.map((order) => {
        const userInfo = getObjFromArr(users, '_id', order.owner);//Get owner this order
        const foodInfoArr = order.food.map( (foodId) => getObjFromArr(food, '_id', foodId) );//Get array of food objects

        //Get array of objects with detailed order for each food item
        const OrderInfo = foodInfoArr.map((foodItem) => {
            const discount = getDiscount(event, foodItem);
            const quantity = getQuantity(order, foodItem);

            return {
                name: foodItem.name,
                price: foodItem.price - discount,
                quantity: quantity,
            }
        });

        return {
            userName: userInfo.username,
            email: userInfo.emails[0].address,
            order: OrderInfo
        };
    });
};

export const getQuantity = (order, foodItem) => {
    let quantity = order.quantity[foodItem._id];
    quantity = quantity ? quantity : 1;//If quantity not exist set it to 1

    return quantity;
};

export const getDiscount = (event, foodItem ) => {
    let discount = event.discount[foodItem._id];
    discount = discount ? discount : 0;//If discount not exist set it to 0

    return discount;
};