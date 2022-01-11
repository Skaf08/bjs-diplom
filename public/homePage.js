"use strict"

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function getCourses() {
    ApiConnector.getStocks(response => {
       if (response.success) {
           ratesBoard.clearTable();
           ratesBoard.fillTable(response.data);
       }
    });
}
getCourses();
setInterval(getCourses, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "The operation was successful");
        } else {
            moneyManager.setMessage(false, 'unsuccessful: ' + response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "The operation was successful");
        } else {
            moneyManager.setMessage(false, 'unsuccessful: ' + response.error);
        }
    });
}

moneyManager.sendMoneyCallback  = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "The operation was successful");
        } else {
            moneyManager.setMessage(false, 'unsuccessful: ' + response.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable(response.data);
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable(response.data);
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "The operation was successful");
        } else {
            favoritesWidget.setMessage(false, 'unsuccessful: ' + response.error);
        }
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable(response.data);
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "The operation was successful");
        } else {
            favoritesWidget.setMessage(false, 'unsuccessful: ' + response.error);
        }
    })
}