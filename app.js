// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Utility functions for localStorage
const Storage = {
    get: (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    add: (key, item) => {
        const data = Storage.get(key);
        item.id = Date.now().toString();
        data.push(item);
        Storage.set(key, data);
        return item;
    },
    update: (key, id, updates) => {
        const data = Storage.get(key);
        const index = data.findIndex(item => item.id === id);
        if (index !== -1) {
            data[index] = { ...data[index], ...updates };
            Storage.set(key, data);
            return data[index];
        }
        return null;
    },
    delete: (key, id) => {
        const data = Storage.get(key);
        const filtered = data.filter(item => item.id !== id);
        Storage.set(key, filtered);
    }
};

// Calculation utilities
const Calculations = {
    // Monthly Report calculations
    calculateFixedCost: (shop1, shop2, house1, house2) => {
        return (parseFloat(shop1) || 0) + (parseFloat(shop2) || 0) + 
               (parseFloat(house1) || 0) + (parseFloat(house2) || 0);
    },
    calculateDailyFixedCost: (fixedCost, days) => {
        const daysValue = parseFloat(days) || 1;
        return daysValue > 0 ? (parseFloat(fixedCost) || 0) / daysValue : 0;
    },
    // Daily Report calculations
    calculateTotalSalary: (tailors) => {
        return tailors.reduce((sum, t) => sum + (parseFloat(t) || 0), 0);
    },
    calculateTotalHelperSalary: (helpers) => {
        return helpers.reduce((sum, h) => sum + (parseFloat(h) || 0), 0);
    },
    calculateEBUsage: (ebOpen, ebClose) => {
        return ((parseFloat(ebClose) || 0) - (parseFloat(ebOpen) || 0)) * 13;
    },
    calculateDailyExpense: (pettyCash, totalSalary, totalHelperSalary, ebUsage) => {
        return (parseFloat(pettyCash) || 0) + (parseFloat(totalSalary) || 0) + 
               (parseFloat(totalHelperSalary) || 0) + (parseFloat(ebUsage) || 0);
    },
    // Orders calculations
    calculateBoutiqueOrderBill: (service) => {
        return parseFloat(service) || 0;
    },
    calculateBulkTotalBill: (bulkBill, pieces) => {
        return (parseFloat(bulkBill) || 0) * (parseFloat(pieces) || 0);
    },
    calculateBoutiqueTotalExpense: (lining, falls, aari, embroidery, extraWork, mainFabric, cutting, stitching) => {
        return (parseFloat(lining) || 0) + (parseFloat(falls) || 0) + 
               (parseFloat(aari) || 0) + (parseFloat(embroidery) || 0) + 
               (parseFloat(extraWork) || 0) + (parseFloat(mainFabric) || 0) + 
               (parseFloat(cutting) || 0) + (parseFloat(stitching) || 0);
    },
    calculateBulkTotalExpense: (boutiqueExpense, pieces) => {
        return (parseFloat(boutiqueExpense) || 0) * (parseFloat(pieces) || 0);
    },
    calculateTotalOrderExpense: (boutiqueExpense, bulkExpense) => {
        return (parseFloat(boutiqueExpense) || 0) + (parseFloat(bulkExpense) || 0);
    }
};

// Format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2
    }).format(value);
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
}


