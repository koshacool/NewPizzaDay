/**
 * In array with objects find object which contains the value
 *
 * @param {array} arr Array with objects
 * @param {string} paramName Object's property name
 * @param {string} value Value which search in object
 *     
 * @return {number} 
 */
export const getObjFromArr = (arr, paramName, value) => arr.filter( obj => obj[paramName] === value )[0];

/**
 * Count price of all confirmed orders
 *
 * @param {array} orders Array of all orders
 * @param {array} food Food availabled for this event
 * @param {object} event
 *     
 * @return {number} 
 */
export const totalPrice = (orders, food, event) => {
    const confirmedOrders = getConfirmedOrders(orders);//Get only confirmed orders

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

/**
 * Get array with objects which contain detailed users orders
 *
 * @param {array} orders Array of all orders
 * @param {array} users Users added to this event
 * @param {array} food Food availabled for this event
 * @param {object} event
 *     
 * @return {array} 
 */
export const detailedUsersPrice = (orders, users, food, event) => {
    const confirmedOrders = getConfirmedOrders(orders);//Get only confirmed orders
    const usersOrders =  getOrdersForMail(confirmedOrders, users, food, event);//Get detailed users orders

    return usersOrders;
};

/**
 * Return only confirmed orders
 *
 * @param {array} orders All orders in event
 *     
 * @return {array} Only confirmed orders
 */
export const getConfirmedOrders = (orders) => {
    return orders.filter(order => order.status);
};

/**
 * Get array with objects which contain detailed users orders
 *
 * @param {array} orders Array of all confirmed orders
 * @param {array} users Users added to this event
 * @param {array} food Food availabled for this event
 * @param {object} event
 *     
 * @return {array} 
 */
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


/**
 * Get quantity for food item from event if it exist, else return 1
 *
 * @param {object} event 
 * @param {object} foodItem
 *     
 * @return {number} 
 */
export const getQuantity = (order, foodItem) => {
    let quantity = order.quantity[foodItem._id];
    quantity = quantity ? quantity : 1;//If quantity not exist set it to 1

    return quantity;
};

/**
 * Get discount for food item from event if it exist, else return 0
 *
 * @param {object} event 
 * @param {object} foodItem
 *     
 * @return {number} 
 */
export const getDiscount = (event, foodItem) => {
    let discount = event.discount[foodItem._id];
    discount = discount ? discount : 0;//If discount not exist set it to 0

    return discount;
};