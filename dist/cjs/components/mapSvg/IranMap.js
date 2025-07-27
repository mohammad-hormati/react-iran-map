"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var IranMapWrapper_1 = tslib_1.__importDefault(require("./IranMapWrapper"));
var provinces_1 = require("../../data/provinces");
require("./iran-map.css");
var IranMap = function (_a) {
    var _b;
    var data = _a.data, width = _a.width, colorRange = _a.colorRange, defaultSelectedProvince = _a.defaultSelectedProvince, _c = _a.textColor, textColor = _c === void 0 ? '#000' : _c, _d = _a.deactiveProvinceColor, deactiveProvinceColor = _d === void 0 ? '#e6e6e6' : _d, selectedProvinceColor = _a.selectedProvinceColor, _e = _a.tooltipTitle, tooltipTitle = _e === void 0 ? '' : _e, selectProvinceHandler = _a.selectProvinceHandler;
    var mapRef = (0, react_1.useRef)(null);
    var _f = (0, react_1.useState)(null), provinceName = _f[0], setProvinceName = _f[1];
    var _g = (0, react_1.useState)({
        name: defaultSelectedProvince ? defaultSelectedProvince : '',
        faName: defaultSelectedProvince
            ? (_b = provinces_1.provinces.find(function (province) { return province.provinceName === defaultSelectedProvince; })) === null || _b === void 0 ? void 0 : _b.provinceFaName
            : '',
    }), selectedProvince = _g[0], setSelectedProvince = _g[1];
    var pathMouseOverHandler = function (event) {
        var path = event.target;
        setProvinceName(path.dataset.name);
    };
    var pathClickedHandle = function (pathName) {
        var _a, _b;
        setSelectedProvince({
            faName: pathName,
            name: (_a = provinces_1.provinces.find(function (province) { return province.provinceFaName === pathName; })) === null || _a === void 0 ? void 0 : _a.provinceName,
        });
        selectProvinceHandler &&
            selectProvinceHandler({
                faName: pathName,
                name: (_b = provinces_1.provinces.find(function (province) { return province.provinceFaName === pathName; })) === null || _b === void 0 ? void 0 : _b.provinceName,
            });
    };
    var setPathBackgrounds = function (svg, mapData) {
        var polygons = svg.querySelectorAll('polygon');
        var paths = svg.querySelectorAll('path');
        var values = Object.values(mapData);
        //@ts-ignore
        var min = Math.min.apply(Math, values);
        var max = Math.max.apply(Math, values);
        var setColorHandler = function (element) {
            var _a, _b;
            var title = (_a = provinces_1.provinces.find(function (item) { return item.provinceFaName === element.getAttribute('data-name'); })) === null || _a === void 0 ? void 0 : _a.provinceName;
            var selectedItem = (_b = provinces_1.provinces.find(function (province) { return province.provinceFaName === selectedProvince.faName; })) === null || _b === void 0 ? void 0 : _b.provinceFaName;
            if (title) {
                var count = mapData[title.trim()];
                if (count === 0) {
                    element.style.fill = deactiveProvinceColor;
                }
                else {
                    if (min !== max) {
                        var alpha = Math.max(0.1, Math.min(1, (count - min) / (max - min)));
                        var usageColor = "rgba(".concat(colorRange, ", ").concat(alpha, ")");
                        element.style.fill = usageColor;
                    }
                    else {
                        var usageColor = "rgba(".concat(colorRange, ", ").concat(min > 0 ? 1 : 0.1, ")");
                        element.style.fill = usageColor;
                    }
                }
            }
            if (element.getAttribute('data-name') === selectedItem && selectedProvinceColor) {
                element.style.fill = selectedProvinceColor;
            }
        };
        paths.forEach(function (path) {
            setColorHandler(path);
        });
        polygons.forEach(function (polygon) {
            setColorHandler(polygon);
        });
    };
    (0, react_1.useEffect)(function () {
        if (mapRef.current) {
            setPathBackgrounds(mapRef.current, data);
        }
    }, [mapRef, selectedProvince]);
    return (react_1.default.createElement("div", { className: 'iran-map-wrapper', style: { width: width ? width : 500 } },
        react_1.default.createElement(IranMapWrapper_1.default, { mapRef: mapRef, textColor: textColor, provinceName: provinceName, selectedProvince: selectedProvince, pathClickedHandle: pathClickedHandle, pathMouseOverHandler: pathMouseOverHandler, data: data, tooltipTitle: tooltipTitle, width: width })));
};
exports.default = IranMap;
//# sourceMappingURL=IranMap.js.map