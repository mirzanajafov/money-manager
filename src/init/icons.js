const Icon = require('../models/icons')
const Logger = require('../utils/logger');




const insertIcons = async() => {
    Logger.info(`Icons inserting start`)

    const icons = [{
            iconName: 'schedule'
        },
        {
            iconName: 'wine_bar'
        },
        {
            iconName: 'account_balance'
        },
        {
            iconName: 'shopping_cart'
        },
        {
            iconName: 'restaurant'
        },
        {
            iconName: 'directions_car'
        },
        {
            iconName: 'credit_card'
        },
        {
            iconName: 'smoking_rooms'
        },
        {
            iconName: 'school'
        },
        {
            iconName: 'family_restroom'
        },
        {
            iconName: 'local_hospital'
        },
        {
            iconName: 'cottage'
        },
        {
            iconName: 'savings'
        },
        {
            iconName: 'local_activity'
        },
        {
            iconName: 'question_mark'
        },
        {
            iconName: 'pets'
        },
        {
            iconName: 'stadia_controller'
        },
        {
            iconName: 'redeem'
        },
        {
            iconName: 'shopping_basket'
        },
        {
            iconName: 'account_balance_wallet'
        },
        {
            iconName: 'sell'
        },
        {
            iconName: 'monetization_on'
        },
        {
            iconName: 'toys'
        },
        {
            iconName: 'request_quote'
        },
        {
            iconName: 'fitness_center'
        },
        {
            iconName: 'directions_bus'
        },
        {
            iconName: 'flight_takeoff'
        },
        {
            iconName: 'electric_bolt'
        },
        {
            iconName: 'pedal_bike'
        },
        {
            iconName: 'article'
        },
        {
            iconName: 'lunch_dining'
        },
        {
            iconName: 'festival'
        },
        {
            iconName: 'chair'
        },
        {
            iconName: 'child_care'
        },
        {
            iconName: 'apartment'
        },
        {
            iconName: 'computer'
        },
        {
            iconName: 'coffee'
        },
        {
            iconName: 'military_tech'
        },
        {
            iconName: 'local_florist'
        },
        {
            iconName: 'beach_access'
        },
        {
            iconName: 'umbrella'
        },
        {
            iconName: 'local_taxi'
        },
        {
            iconName: 'map'
        },
        {
            iconName: 'monitor'
        },
        {
            iconName: 'phone_iphone'
        },
        {
            iconName: 'security_update_good'
        },
        {
            iconName: 'local_atm'
        },
        {
            iconName: 'two_wheeler'
        },
        {
            iconName: 'landscape'
        },
        {
            iconName: 'theaters'
        },
        {
            iconName: 'panorama'
        },
        {
            iconName: 'music_note'
        },
        {
            iconName: 'monitor_heart'
        },
        {
            iconName: 'local_parking'
        },
        {
            iconName: 'currency_exchange'
        },
        {
            iconName: 'percent'
        },
        {
            iconName: 'child_friendly'
        },
        {
            iconName: 'sports_football'
        },
        {
            iconName: 'train'
        },
        {
            iconName: 'menu_book'
        },
        {
            iconName: 'checkroom'
        },
        {
            iconName: 'local_laundry_service'
        },
        {
            iconName: 'electric_scooter'
        },
        {
            iconName: 'language'
        },
        {
            iconName: 'local_car_wash'
        },
        {
            iconName: 'wc'
        },
        {
            iconName: 'local_gas_station'
        },
        {
            iconName: 'lightbulb'
        },
        {
            iconName: 'shopping_bag'
        },
    ];

    for (const icon of icons) {
        const count = await Icon.countDocuments({ iconName: icon.iconName })

        count == 0 && await new Icon(icon).save()
    }
}

module.exports = insertIcons