'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var history = require('history');
var React = require('react');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function typeOf(value) {
  if (value === null) {
    return "null";
  }

  if (Array.isArray(value)) {
    return "array";
  }

  return typeof value;
}

function getBuildPathDefRouteNameMessage(routeName) {
  return "This problem occurred when building the route definition for the \"" + routeName + "\" route.";
}

function getBuildPathDefErrorMessage(context) {
  return [getBuildPathDefRouteNameMessage(context.routeName), "The path was constructed as `" + context.rawPath + "`"];
}

var TypeRouteError = /*#__PURE__*/buildErrorCollection({
  Path_may_not_be_an_empty_string: {
    errorCode: 1000,
    getDetails: getBuildPathDefErrorMessage
  },
  Path_must_start_with_a_forward_slash: {
    errorCode: 1001,
    getDetails: getBuildPathDefErrorMessage
  },
  Path_may_not_end_with_a_forward_slash: {
    errorCode: 1002,
    getDetails: getBuildPathDefErrorMessage
  },
  Path_may_not_include_characters_that_must_be_URL_encoded: {
    errorCode: 1003,
    getDetails: function getDetails(context, segment) {
      var _segment$trailing, _segment$paramId;

      var leading = segment.leading;
      var trailing = (_segment$trailing = segment.trailing) != null ? _segment$trailing : "";
      var paramId = (_segment$paramId = segment.paramId) != null ? _segment$paramId : "";
      var invalidCharacters = (leading + trailing).split("").filter(function (character) {
        return character !== encodeURIComponent(character);
      });
      return [].concat(getBuildPathDefErrorMessage(context), ["The path segment `" + (leading + paramId + trailing) + "` has the following invalid characters: " + invalidCharacters.join(", ")]);
    }
  },
  Path_may_not_include_empty_segments: {
    errorCode: 1004,
    getDetails: function getDetails(context) {
      return [].concat(getBuildPathDefErrorMessage(context), ["Empty segments can be spotted by finding the place in the path with two consecutive forward slashes '//'."]);
    }
  },
  Path_may_have_at_most_one_parameter_per_segment: {
    errorCode: 1005,
    getDetails: function getDetails(context, parameterNames) {
      return [].concat(getBuildPathDefErrorMessage(context), ["A single segment of the path included the following parameters: " + parameterNames, "Consider using ofType with a customer ValueSerializer for this scenario."]);
    }
  },
  Path_parameters_may_not_be_used_more_than_once_when_building_a_path: {
    errorCode: 1005,
    getDetails: function getDetails(context, parameterName) {
      return [].concat(getBuildPathDefErrorMessage(context), ["The parameter \"" + parameterName + "\" was used more than once."]);
    }
  },
  Optional_path_parameters_may_not_have_any_text_around_the_parameter: {
    errorCode: 1006,
    getDetails: function getDetails(context, parameterName, leadingText, trailingText) {
      var messages = getBuildPathDefErrorMessage(context);

      if (leadingText) {
        messages.push("The parameter \"" + parameterName + "\" cannot be preceded by \"" + leadingText + "\".");
      }

      if (trailingText) {
        messages.push("The parameter \"" + parameterName + "\" cannot be followed by \"" + trailingText + "\".");
      }

      return messages;
    }
  },
  Path_may_have_at_most_one_optional_or_trailing_parameter: {
    errorCode: 1007,
    getDetails: function getDetails(context, numOptionalTrailingParameterNames) {
      return [].concat(getBuildPathDefErrorMessage(context), ["At most one optional/trailing parameter should be given but " + numOptionalTrailingParameterNames + " were provided."]);
    }
  },
  Optional_or_trailing_path_parameters_may_only_appear_in_the_last_path_segment: {
    errorCode: 1008,
    getDetails: getBuildPathDefErrorMessage
  },
  All_path_parameters_must_be_used_in_path_construction: {
    errorCode: 1009,
    getDetails: function getDetails(context, unusedParameters) {
      return [].concat(getBuildPathDefErrorMessage(context), ["The following parameters were not used: " + unusedParameters.join(", ")]);
    }
  },
  Path_parameter_name_must_not_include_curly_brackets_dollar_signs_or_the_forward_slash_character: {
    errorCode: 1010,
    getDetails: function getDetails(routeName, paramName) {
      return [getBuildPathDefRouteNameMessage(routeName), "The $ { } or / character was used in this parameter name: " + paramName];
    }
  },
  Extension_route_definition_parameter_names_may_not_be_the_same_as_base_route_definition_parameter_names: {
    errorCode: 1011,
    getDetails: function getDetails(duplicateParameterNames) {
      return ["The following parameter names were used in both the base route definition and the extension: " + duplicateParameterNames.join(", ")];
    }
  },
  Expected_type_does_not_match_actual_type: {
    errorCode: 1012,
    getDetails: function getDetails(_ref) {
      var context = _ref.context,
          value = _ref.value,
          valueName = _ref.valueName,
          expectedType = _ref.expectedType,
          actualType = _ref.actualType;
      return ["Problem found with your usage of `" + context + "`", "`" + valueName + "` was expected to be of type `" + (Array.isArray(expectedType) ? expectedType.join(" | ") : expectedType) + "` but was of type `" + actualType + "`", "The actual value provided was: " + (typeOf(value) === "object" ? "\n" + JSON.stringify(value, null, 2).split("\n").map(function (line) {
        return "  " + line;
      }).join("\n") : "`" + value + "`")];
    }
  },
  Expected_number_of_arguments_does_match_actual_number: {
    errorCode: 1013,
    getDetails: function getDetails(_ref2) {
      var context = _ref2.context,
          args = _ref2.args,
          min = _ref2.min,
          max = _ref2.max;
      return ["Problem found with your usage of `" + context + "`", "Expected " + min + (min === max ? "" : " - " + max) + " but received " + args.length + " argument" + (args.length === 1 ? "" : "s")];
    }
  },
  Query_string_array_format_and_custom_query_string_serializer_may_not_both_be_provided: {
    errorCode: 1014,
    getDetails: function getDetails() {
      return ["You may not provide both options.arrayFormat.queryString and options.queryStringSerializer. These options are not compatible."];
    }
  },
  Expected_length_of_array_does_match_actual_length: {
    errorCode: 1015,
    getDetails: function getDetails(_ref3) {
      var context = _ref3.context,
          array = _ref3.array,
          min = _ref3.min,
          max = _ref3.max;
      return ["Problem found with your usage of `" + context + "`", "Expected array to be of length " + min + (min === max ? "" : " - " + max) + " but actual length was " + array.length];
    }
  },
  Encountered_unexpected_parameter_when_building_route: {
    errorCode: 1016,
    getDetails: function getDetails(_ref4) {
      var routeName = _ref4.routeName,
          unexpectedParameterName = _ref4.unexpectedParameterName,
          allowedParameterNames = _ref4.allowedParameterNames;
      return ["Problem found with your usage of routes." + routeName + "( ... )", "Unexpected parameter passed to route builder named \"" + unexpectedParameterName + "\"", allowedParameterNames.length === 0 ? "The route does not take any parameters" : "This route takes the following parameters: " + allowedParameterNames.map(function (name) {
        return "\"" + name + "\"";
      }).join(", ")];
    }
  },
  Missing_required_parameter_when_building_route: {
    errorCode: 1017,
    getDetails: function getDetails(_ref5) {
      var routeName = _ref5.routeName,
          missingParameterName = _ref5.missingParameterName;
      return ["Problem found with your usage of routes." + routeName + "( ... )", "The parameter \"" + missingParameterName + "\" is required but was not provided."];
    }
  },
  Base_url_must_start_with_a_forward_slash: {
    errorCode: 1018,
    getDetails: function getDetails(baseUrl) {
      return ['Base URL must start with a forward slash "/"', "The value you provided \"" + baseUrl + "\" does not start with a forward slash."];
    }
  },
  Base_url_must_not_contain_any_characters_that_must_be_url_encoded: {
    errorCode: 1019,
    getDetails: function getDetails(baseUrl) {
      var invalidCharacters = baseUrl.replace(/\//g, "").split("").filter(function (character) {
        return character !== encodeURIComponent(character);
      });
      return ["The following characters are invalid: " + invalidCharacters.join(", ") + "."];
    }
  },
  App_should_be_wrapped_in_a_RouteProvider_component: {
    errorCode: 1020,
    getDetails: function getDetails() {
      return ["Your application must be wrapped in the `RouteProvider` component returned by `createRouter` in order to use the `useRoute` hook."];
    }
  },
  Invalid_React_version: {
    errorCode: 1021,
    getDetails: function getDetails(version) {
      return ["React version must be 16.8 or greater.", "You have version " + version + " installed.", "If you cannot upgrade the React version try using `type-route/core`."];
    }
  }
});

function buildErrorCollection(definitions) {
  var errors = {};
  Object.keys(definitions).forEach(function (key) {
    var name = key.replace(/_/g, " ") + ".";
    var _definitions$key = definitions[key],
        errorCode = _definitions$key.errorCode,
        getDetails = _definitions$key.getDetails;
    var messageTitle = "TR" + errorCode + " \xB7 " + name;
    errors[key] = {
      errorCode: errorCode,
      name: name,
      create: function create() {
        var _getDetails;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var message = ((_getDetails = getDetails == null ? void 0 : getDetails.apply(void 0, args)) != null ? _getDetails : []).map(function (detail) {
          return "- " + detail;
        }).join("\n");
        var error = new Error(message ? "\n\n" + messageTitle + "\n\n" + message + "\n" : "\n\n" + messageTitle + "\n");
        error.name = "(hopefully helpful \uD83D\uDE04) TypeRouteError";
        return error;
      }
    };
  });
  return errors;
}

function asArray(value) {
  return Array.isArray(value) ? value : [value];
}

function assert(context, assertions) {
  assertions.forEach(function (assert) {
    return assert(context);
  });
}

assert.arrayLength = function (array, min, max) {
  if (max === void 0) {
    max = min;
  }

  return function (context) {
    if (array.length < min || array.length > max) {
      throw TypeRouteError.Expected_length_of_array_does_match_actual_length.create({
        context: context,
        array: array,
        min: min,
        max: max
      });
    }
  };
};

assert.numArgs = function (args, min, max) {
  if (max === void 0) {
    max = min;
  }

  return function (context) {
    if (args.length < min || args.length > max) {
      throw TypeRouteError.Expected_number_of_arguments_does_match_actual_number.create({
        context: context,
        args: args,
        min: min,
        max: max
      });
    }
  };
};

assert.collectionOfType = function (expectedType, valueName, value) {
  return function (context) {
    if (typeOf(value) === "object") {
      var valuePropertyNames = Object.keys(value);

      for (var _i = 0, _valuePropertyNames = valuePropertyNames; _i < _valuePropertyNames.length; _i++) {
        var propertyName = _valuePropertyNames[_i];
        assert.type(expectedType, valueName + "." + propertyName, value[propertyName])(context);
      }

      return;
    }

    throw TypeRouteError.Expected_type_does_not_match_actual_type.create({
      context: context,
      actualType: typeOf(value),
      expectedType: "Record<string, " + (Array.isArray(expectedType) ? expectedType.join(" | ") : expectedType) + ">",
      value: value,
      valueName: valueName
    });
  };
};

assert.arrayOfType = function (expectedType, valueName, value) {
  return function (context) {
    if (Array.isArray(value)) {
      for (var index = 0; index < value.length; index++) {
        assert.type(expectedType, valueName + "[" + index + "]", value[index])(context);
      }

      return;
    }

    throw TypeRouteError.Expected_type_does_not_match_actual_type.create({
      context: context,
      actualType: typeOf(value),
      expectedType: "Array<" + (Array.isArray(expectedType) ? expectedType.join(" | ") : expectedType) + ">",
      value: value,
      valueName: valueName
    });
  };
};

assert.type = function (expectedType, valueName, value) {
  return function (context) {
    var expectedTypeList = typeof expectedType === "string" ? [expectedType] : expectedType;

    for (var _iterator = _createForOfIteratorHelperLoose(expectedTypeList), _step; !(_step = _iterator()).done;) {
      var _expectedType = _step.value;

      var expectsProperType = _expectedType[0].toUpperCase() === _expectedType[0];

      if (expectsProperType && (typeOf(value) === "object" || typeOf(value) === "function") && typeOf(value["~internal"]) === "object" && value["~internal"].type === _expectedType || !expectsProperType && typeOf(value) === _expectedType) {
        return;
      }
    }

    throw TypeRouteError.Expected_type_does_not_match_actual_type.create({
      context: context,
      actualType: typeOf(value),
      expectedType: expectedType,
      value: value,
      valueName: valueName
    });
  };
};

function buildPathDefs(routeName, pathParamDefCollection, getRawPath) {
  var namedPathParamDefs = Object.keys(pathParamDefCollection).map(function (paramName) {
    var namedPathParameterDefinition = _extends({
      paramName: paramName
    }, pathParamDefCollection[paramName]);

    return namedPathParameterDefinition;
  });
  var paramIdCollection = {};
  namedPathParamDefs.forEach(function (_ref) {
    var paramName = _ref.paramName;

    {
      if (paramName.indexOf("$") >= 0 || paramName.indexOf("{") >= 0 || paramName.indexOf("}") >= 0 || paramName.indexOf("/") >= 0) {
        throw TypeRouteError.Path_parameter_name_must_not_include_curly_brackets_dollar_signs_or_the_forward_slash_character.create(routeName, paramName);
      }
    }

    paramIdCollection[paramName] = getParamId(paramName);
  });
  var rawPath = getRawPath(paramIdCollection);

  {
    if (Array.isArray(rawPath)) {
      assert("ReturnType<" + routeName + ".path>", [assert.arrayOfType("string", "path", rawPath), assert.arrayLength(rawPath, 1, Infinity)]);
    } else {
      assert("ReturnType<" + routeName + ".path>", [assert.type("string", "path", rawPath)]);
    }
  }

  return asArray(rawPath).map(function (rawPath) {
    var errorContext = {
      rawPath: rawPath,
      routeName: routeName
    };

    {
      if (rawPath.length === 0) {
        throw TypeRouteError.Path_may_not_be_an_empty_string.create(errorContext);
      }

      if (rawPath[0] !== "/") {
        throw TypeRouteError.Path_must_start_with_a_forward_slash.create(errorContext);
      }
    }

    if (rawPath.length === 1) {
      return [];
    }

    {
      if (rawPath.length > 0 && rawPath[rawPath.length - 1] === "/") {
        throw TypeRouteError.Path_may_not_end_with_a_forward_slash.create(errorContext);
      }
    }

    var rawPathSegments = rawPath.split("/").slice(1);
    var usedPathParams = {};
    var pathDef = [];

    for (var _iterator = _createForOfIteratorHelperLoose(rawPathSegments), _step; !(_step = _iterator()).done;) {
      var rawSegment = _step.value;

      {
        if (rawSegment.length === 0) {
          throw TypeRouteError.Path_may_not_include_empty_segments.create(errorContext);
        }
      }

      var includedParamDef = null;

      for (var _iterator2 = _createForOfIteratorHelperLoose(namedPathParamDefs), _step2; !(_step2 = _iterator2()).done;) {
        var paramDef = _step2.value;

        if (rawSegment.indexOf(getParamId(paramDef.paramName)) >= 0) {
          {
            if (includedParamDef !== null) {
              throw TypeRouteError.Path_may_have_at_most_one_parameter_per_segment.create(errorContext, [paramDef.paramName, includedParamDef.paramName]);
            }

            if (usedPathParams[paramDef.paramName]) {
              throw TypeRouteError.Path_parameters_may_not_be_used_more_than_once_when_building_a_path.create(errorContext, paramDef.paramName);
            }
          }

          includedParamDef = paramDef;
          usedPathParams[paramDef.paramName] = true;
        }
      }

      if (includedParamDef) {
        var _rawSegment$split = rawSegment.split(getParamId(includedParamDef.paramName)),
            leading = _rawSegment$split[0],
            trailing = _rawSegment$split[1];

        {
          if (encodeURIComponent(leading) !== leading || encodeURIComponent(trailing) !== trailing) {
            throw TypeRouteError.Path_may_not_include_characters_that_must_be_URL_encoded.create(errorContext, {
              leading: leading,
              paramId: getParamId(includedParamDef.paramName),
              trailing: trailing
            });
          }

          if (includedParamDef["~internal"].optional && (leading !== "" || trailing !== "")) {
            throw TypeRouteError.Optional_path_parameters_may_not_have_any_text_around_the_parameter.create(errorContext, includedParamDef.paramName, leading, trailing);
          }
        }

        pathDef.push({
          leading: leading,
          trailing: trailing,
          namedParamDef: includedParamDef
        });
      } else {
        {
          if (encodeURIComponent(rawSegment) !== rawSegment) {
            throw TypeRouteError.Path_may_not_include_characters_that_must_be_URL_encoded.create(errorContext, {
              leading: rawSegment
            });
          }
        }

        pathDef.push({
          leading: rawSegment,
          trailing: "",
          namedParamDef: null
        });
      }
    }

    var numOptionalOrTrailingParams = pathDef.filter(function (part) {
      var _part$namedParamDef, _part$namedParamDef2;

      return ((_part$namedParamDef = part.namedParamDef) == null ? void 0 : _part$namedParamDef["~internal"].optional) || ((_part$namedParamDef2 = part.namedParamDef) == null ? void 0 : _part$namedParamDef2["~internal"].trailing);
    }).length;

    {
      if (numOptionalOrTrailingParams > 1) {
        throw TypeRouteError.Path_may_have_at_most_one_optional_or_trailing_parameter.create(errorContext, numOptionalOrTrailingParams);
      }
    }

    var lastPathSegmentParameterDefinition = pathDef[pathDef.length - 1].namedParamDef;

    {
      if (numOptionalOrTrailingParams === 1 && !(lastPathSegmentParameterDefinition != null && lastPathSegmentParameterDefinition["~internal"].optional) && !(lastPathSegmentParameterDefinition != null && lastPathSegmentParameterDefinition["~internal"].trailing)) {
        throw TypeRouteError.Optional_or_trailing_path_parameters_may_only_appear_in_the_last_path_segment.create(errorContext);
      }
    }

    var unusedPathParameterDefinitions = namedPathParamDefs.map(function (_ref2) {
      var name = _ref2.paramName;
      return name;
    }).filter(function (name) {
      return !usedPathParams[name];
    });

    {
      if (unusedPathParameterDefinitions.length > 0) {
        throw TypeRouteError.All_path_parameters_must_be_used_in_path_construction.create(errorContext, unusedPathParameterDefinitions);
      }
    }

    return pathDef;
  });
}

function getParamId(parameterName) {
  return "${p." + parameterName + "}";
}

function getParamDefsOfType(type, paramDefCollection) {
  var filteredParamDefCollection = {};
  Object.keys(paramDefCollection).forEach(function (name) {
    var paramDef = paramDefCollection[name];

    if (paramDef["~internal"].kind === type) {
      filteredParamDefCollection[name] = paramDef;
    }
  });
  return filteredParamDefCollection;
}

function createLocation(_ref) {
  var paramCollection = _ref.paramCollection,
      paramDefCollection = _ref.paramDefCollection,
      arraySeparator = _ref.arraySeparator,
      queryStringSerializer = _ref.queryStringSerializer,
      pathDefs = _ref.pathDefs,
      baseUrl = _ref.baseUrl;
  var params = {
    path: {},
    query: {},
    state: {}
  };

  var _loop = function _loop(paramName) {
    var _paramDef$Internal$v;

    var paramValue = paramCollection[paramName];

    if (paramValue === undefined) {
      return "continue";
    }

    var paramDef = paramDefCollection[paramName];
    var urlEncodeDefault = paramDef["~internal"].kind !== "state" && !paramDef["~internal"].trailing;
    var urlEncode = (_paramDef$Internal$v = paramDef["~internal"].valueSerializer.urlEncode) != null ? _paramDef$Internal$v : urlEncodeDefault;
    var value = void 0;

    if (paramDef["~internal"].array) {
      if (!Array.isArray(paramValue)) {
        {
          throw TypeRouteError.Expected_type_does_not_match_actual_type.create({
            context: "routes[routeName](...)",
            actualType: typeOf(paramValue),
            expectedType: "array",
            value: paramValue,
            valueName: paramName
          });
        }
      }

      value = paramValue.length === 0 ? null : paramValue.map(function (part) {
        return stringify(paramDef, part, urlEncode);
      }).join(arraySeparator);
    } else {
      value = stringify(paramDef, paramValue, urlEncode);
    }

    params[paramDef["~internal"].kind][paramName] = {
      valueSerializerId: paramDef["~internal"].valueSerializer.id,
      array: paramDef["~internal"].array,
      value: value
    };
  };

  for (var paramName in paramDefCollection) {
    var _ret = _loop(paramName);

    if (_ret === "continue") continue;
  }

  var path = "/" + pathDefs[0].filter(function (_ref2) {
    var namedParamDef = _ref2.namedParamDef;
    return !(namedParamDef != null && namedParamDef["~internal"].optional && params.path[namedParamDef.paramName] === undefined);
  }).map(function (_ref3) {
    var namedParamDef = _ref3.namedParamDef,
        leading = _ref3.leading,
        trailing = _ref3.trailing;
    var rawParam = namedParamDef ? params.path[namedParamDef.paramName].value : "";
    return leading + rawParam + trailing;
  }).join("/");
  var hasQueryParams = Object.keys(params.query).length > 0;
  var query = hasQueryParams ? queryStringSerializer.stringify(params.query) : undefined;

  {
    if (hasQueryParams) {
      assert("query", [assert.type("string", "query", query)]);
    }
  }

  var state = Object.keys(params.state).length === 0 ? undefined : Object.keys(params.state).reduce(function (state, key) {
    var _extends2;

    return _extends({}, state, (_extends2 = {}, _extends2[key] = params.state[key].value, _extends2));
  }, {});
  return {
    fullPath: (baseUrl === "/" ? "" : baseUrl) + path,
    path: path,
    query: query,
    state: state
  };
}

function stringify(paramDef, value, urlEncode) {
  var result = paramDef["~internal"].valueSerializer.stringify(value);

  {
    assert("[ValueSerializer].stringify", [assert.type("string", "result", result)]);
  }

  return urlEncode ? encodeURIComponent(result) : result;
}

var noMatch = {
  __noMatch: true
};

var stringUtils = {
  startsWith: startsWith,
  endsWith: endsWith,
  splitFirst: splitFirst
};

function startsWith(value, start) {
  for (var i = 0; i < start.length; i++) {
    if (start[i] !== value[i]) {
      return false;
    }
  }

  return true;
}

function endsWith(value, end) {
  for (var i = 1; i <= end.length; i++) {
    if (end[end.length - i] !== value[value.length - i]) {
      return false;
    }
  }

  return true;
}

function splitFirst(value, split) {
  var _value$split = value.split(split),
      first = _value$split[0],
      rest = _value$split.slice(1);

  return [first, rest.join(split)];
}

var endsWith$1 = stringUtils.endsWith,
    startsWith$1 = stringUtils.startsWith;
function getPathMatch(_ref) {
  var path = _ref.path,
      pathDefs = _ref.pathDefs,
      arraySeparator = _ref.arraySeparator;

  for (var index = 0; index < pathDefs.length; index++) {
    var result = match(pathDefs[index]);

    if (result !== false) {
      return _extends({}, result, {
        primaryPath: index === 0
      });
    }
  }

  return false;

  function match(pathDef) {
    var params = {};

    if (path === "/" && pathDef.length === 0) {
      return {
        params: params,
        numExtraneousParams: 0
      };
    }

    var pathHasTrailingSlash = path.length > 1 && endsWith$1(path, "/");

    if (pathHasTrailingSlash) {
      path = path.slice(0, path.length - 1);
    }

    var pathSegmentList = path.split("/").slice(1);

    var _loop = function _loop(segmentIndex) {
      var _pathSegmentDef$named2, _pathSegmentDef$named3;

      var pathSegmentDef = segmentIndex >= pathDef.length ? null : pathDef[segmentIndex];
      var pathSegment = segmentIndex >= pathSegmentList.length ? null : pathSegmentList[segmentIndex];

      if (pathSegmentDef === null) {
        return {
          v: false
        };
      }

      var numRemainingPathSegmentDefs = pathDef.length - 1 - segmentIndex;

      if (pathSegment === null) {
        var _pathSegmentDef$named;

        if (numRemainingPathSegmentDefs !== 0 || !((_pathSegmentDef$named = pathSegmentDef.namedParamDef) != null && _pathSegmentDef$named["~internal"].optional)) {
          return {
            v: false
          };
        }

        return "break";
      }

      if ((_pathSegmentDef$named2 = pathSegmentDef.namedParamDef) != null && _pathSegmentDef$named2["~internal"].trailing) {
        pathSegment = pathSegmentList.slice(segmentIndex).join("/");
      }

      if (!startsWith$1(pathSegment, pathSegmentDef.leading)) {
        return {
          v: false
        };
      }

      var pathSegmentMinusLeading = pathSegment.slice(pathSegmentDef.leading.length);

      if (!endsWith$1(pathSegmentMinusLeading, pathSegmentDef.trailing)) {
        return {
          v: false
        };
      }

      var pathSegmentMinusLeadingAndTrailing = pathSegmentMinusLeading.slice(0, pathSegmentMinusLeading.length - pathSegmentDef.trailing.length);

      if (!pathSegmentDef.namedParamDef) {
        if (pathSegmentMinusLeadingAndTrailing === "") {
          return "continue";
        }

        return {
          v: false
        };
      }

      if (pathSegmentMinusLeadingAndTrailing === "") {
        if (pathSegmentDef.namedParamDef["~internal"].optional) {
          return "continue";
        }

        return {
          v: false
        };
      }

      var urlEncode = (_pathSegmentDef$named3 = pathSegmentDef.namedParamDef["~internal"].valueSerializer.urlEncode) != null ? _pathSegmentDef$named3 : !pathSegmentDef.namedParamDef["~internal"].trailing;
      var value = void 0;

      if (pathSegmentDef.namedParamDef["~internal"].array) {
        value = pathSegmentMinusLeadingAndTrailing.split(arraySeparator).map(function (part) {
          var _pathSegmentDef$named4;

          return (_pathSegmentDef$named4 = pathSegmentDef.namedParamDef) == null ? void 0 : _pathSegmentDef$named4["~internal"].valueSerializer.parse(urlEncode ? decodeURIComponent(part) : part);
        });

        if (value.some(function (part) {
          return part === noMatch;
        })) {
          return {
            v: false
          };
        }
      } else {
        value = pathSegmentDef.namedParamDef["~internal"].valueSerializer.parse(urlEncode ? decodeURIComponent(pathSegmentMinusLeadingAndTrailing) : pathSegmentMinusLeadingAndTrailing);

        if (value === noMatch) {
          return {
            v: false
          };
        }
      }

      if (pathSegmentDef.namedParamDef["~internal"].trailing && pathHasTrailingSlash && pathSegmentDef.trailing === "") {
        value = value + "/";
      }

      params[pathSegmentDef.namedParamDef.paramName] = value;

      if (pathSegmentDef.namedParamDef["~internal"].trailing) {
        return "break";
      }
    };

    for (var segmentIndex = 0; segmentIndex < Math.max(pathDef.length, pathSegmentList.length); segmentIndex++) {
      var _ret = _loop(segmentIndex);

      if (_ret === "break") break;
      if (_ret === "continue") continue;
      if (typeof _ret === "object") return _ret.v;
    }

    return {
      params: params,
      numExtraneousParams: 0
    };
  }
}

function getObjectMatch(_ref) {
  var object = _ref.object,
      paramDefs = _ref.paramDefs,
      urlEncodeDefault = _ref.urlEncodeDefault,
      arraySeparator = _ref.arraySeparator;
  var params = {};
  var namedParamDefs = Object.keys(paramDefs).map(function (name) {
    return _extends({
      name: name
    }, paramDefs[name]);
  });

  var extraneousParams = _extends({}, object);

  var _loop = function _loop() {
    var paramDef = _step.value;
    var raw = object[paramDef.name];
    delete extraneousParams[paramDef.name];

    if (raw === undefined) {
      if (paramDef["~internal"].optional) {
        return "continue";
      }

      return {
        v: false
      };
    }

    var value = void 0;

    if (raw === null) {
      if (paramDef["~internal"].array) {
        value = [];
      } else if (paramDef["~internal"].optional) {
        return "continue";
      } else {
        return {
          v: false
        };
      }
    } else if (paramDef["~internal"].array) {
      value = raw.split(arraySeparator).map(function (part) {
        var _paramDef$Internal$v;

        return paramDef["~internal"].valueSerializer.parse(((_paramDef$Internal$v = paramDef["~internal"].valueSerializer.urlEncode) != null ? _paramDef$Internal$v : urlEncodeDefault) ? decodeURIComponent(part) : part);
      });

      if (value.some(function (part) {
        return part === noMatch;
      })) {
        if (paramDef["~internal"].optional) {
          return "continue";
        }

        return {
          v: false
        };
      }
    } else {
      var _paramDef$Internal$v2;

      value = paramDef["~internal"].valueSerializer.parse(((_paramDef$Internal$v2 = paramDef["~internal"].valueSerializer.urlEncode) != null ? _paramDef$Internal$v2 : urlEncodeDefault) ? decodeURIComponent(raw) : raw);

      if (value === noMatch) {
        if (paramDef["~internal"].optional) {
          return "continue";
        }

        return {
          v: false
        };
      }
    }

    params[paramDef.name] = value;
  };

  for (var _iterator = _createForOfIteratorHelperLoose(namedParamDefs), _step; !(_step = _iterator()).done;) {
    var _ret = _loop();

    if (_ret === "continue") continue;
    if (typeof _ret === "object") return _ret.v;
  }

  return {
    params: params,
    numExtraneousParams: Object.keys(extraneousParams).length
  };
}

function getStateMatch(state, paramDefs, arraySeparator) {
  return getObjectMatch({
    object: state != null ? state : {},
    paramDefs: paramDefs,
    urlEncodeDefault: false,
    arraySeparator: arraySeparator
  });
}

function getQueryMatch(query, paramDefs, queryStringSerializer, arraySeparator) {
  var object = {};

  if (query) {
    object = queryStringSerializer.parse(query);

    {
      assert("[QueryStringSerializer].parse", [assert.collectionOfType(["string", "null"], "parsedQueryString", object)]);
    }
  }

  return getObjectMatch({
    object: object,
    paramDefs: paramDefs,
    urlEncodeDefault: true,
    arraySeparator: arraySeparator
  });
}

function createMatcher(_ref) {
  var pathDefs = _ref.pathDefs,
      params = _ref.params;
  var queryParamDefCollection = getParamDefsOfType("query", params);
  var stateParamDefCollection = getParamDefsOfType("state", params);
  var defaultParams = {};
  Object.keys(params).forEach(function (paramName) {
    var param = params[paramName];

    if (param["~internal"]["default"] === undefined) {
      return;
    }

    defaultParams[paramName] = param["~internal"]["default"];
  });
  return function (_ref2) {
    var routerLocation = _ref2.routerLocation,
        arraySeparator = _ref2.arraySeparator,
        queryStringSerializer = _ref2.queryStringSerializer;

    if (routerLocation.path === undefined) {
      return false;
    }

    var pathMatch = getPathMatch({
      path: routerLocation.path,
      pathDefs: pathDefs,
      arraySeparator: arraySeparator
    });

    if (pathMatch === false) {
      return false;
    }

    var queryMatch = getQueryMatch(routerLocation.query, queryParamDefCollection, queryStringSerializer, arraySeparator);

    if (queryMatch === false) {
      return false;
    }

    var stateMatch = getStateMatch(routerLocation.state, stateParamDefCollection, arraySeparator);

    if (stateMatch === false) {
      return false;
    }

    return {
      primaryPath: pathMatch.primaryPath,
      params: _extends({}, defaultParams, pathMatch.params, queryMatch.params, stateMatch.params),
      numExtraneousParams: pathMatch.numExtraneousParams + queryMatch.numExtraneousParams + stateMatch.numExtraneousParams
    };
  };
}

function preventDefaultLinkClickBehavior(event) {
  if (event === void 0) {
    event = {};
  }

  var e = event;
  var isModifiedEvent = !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
  var isSelfTarget = !e.target || !e.target.target || e.target.target === "_self";

  if (isSelfTarget && // Ignore everything but links with target self
  !e.defaultPrevented && // onClick prevented default
  e.button === 0 && // ignore everything but left clicks
  !isModifiedEvent // ignore clicks with modifier keys
  ) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    return true;
  }

  return false;
}

var startsWith$2 = stringUtils.startsWith;
function buildRoute(_ref) {
  var routeName = _ref.routeName,
      params = _ref.params,
      location = _ref.location,
      routerContext = _ref.routerContext;
  var navigate = routerContext.navigate,
      history = routerContext.history;
  var href = history.createHref({
    pathname: routeName === false ? location.fullPath : location.path,
    search: location.query ? "?" + location.query : ""
  });

  if (startsWith$2(href, "#")) {
    href = "/" + href;
  }

  if (routeName !== false && routerContext.baseUrl !== "/") {
    href = routerContext.baseUrl + href;
  }

  var route = {
    name: routeName,
    params: params,
    href: href,
    link: {
      href: href,
      onClick: function onClick(event) {
        if (preventDefaultLinkClickBehavior(event)) {
          return route.push();
        }
      }
    },
    action: null,
    push: function push() {
      return navigate(_extends({}, route, {
        action: "push"
      }), true);
    },
    replace: function replace() {
      return navigate(_extends({}, route, {
        action: "replace"
      }), true);
    }
  };
  return route;
}

function createRouteBuilder(routeName, routeDef, getRouterContext) {
  var pathDefs = buildPathDefs(routeName, getParamDefsOfType("path", routeDef["~internal"].params), routeDef["~internal"].path);

  var build = function build(params) {
    if (params === void 0) {
      params = {};
    }

    {
      assert("routes." + routeName, [assert.numArgs([].slice.call(arguments), 0, 1), assert.type("object", "params", params)]);

      for (var paramKey in params) {
        if (!(paramKey in routeDef["~internal"].params)) {
          throw TypeRouteError.Encountered_unexpected_parameter_when_building_route.create({
            routeName: routeName,
            unexpectedParameterName: paramKey,
            allowedParameterNames: Object.keys(routeDef["~internal"].params)
          });
        }
      }

      for (var _paramKey in routeDef["~internal"].params) {
        var value = params[_paramKey];
        var paramDef = routeDef["~internal"].params[_paramKey]["~internal"];

        if (value === undefined) {
          if (!paramDef.optional) {
            throw TypeRouteError.Missing_required_parameter_when_building_route.create({
              routeName: routeName,
              missingParameterName: _paramKey
            });
          }

          continue;
        }
      }
    }

    var routerContext = getRouterContext();
    var arraySeparator = routerContext.arraySeparator,
        queryStringSerializer = routerContext.queryStringSerializer,
        baseUrl = routerContext.baseUrl;

    var paramsWithDefault = _extends({}, params);

    Object.keys(routeDef["~internal"].params).forEach(function (paramName) {
      var paramDef = routeDef["~internal"].params[paramName];

      if (paramsWithDefault[paramName] === undefined && paramDef["~internal"]["default"] !== undefined) {
        paramsWithDefault[paramName] = paramDef["~internal"]["default"];
      }
    });
    var location = createLocation({
      paramCollection: params,
      paramDefCollection: routeDef["~internal"].params,
      arraySeparator: arraySeparator,
      queryStringSerializer: queryStringSerializer,
      pathDefs: pathDefs,
      baseUrl: baseUrl
    });
    return buildRoute({
      routeName: routeName,
      params: paramsWithDefault,
      location: location,
      routerContext: routerContext
    });
  };

  Object.defineProperty(build, "name", {
    value: routeName
  });
  build["~internal"] = {
    type: "RouteBuilder",
    match: createMatcher({
      pathDefs: pathDefs,
      params: routeDef["~internal"].params
    }),
    pathDefs: pathDefs,
    Route: null
  };
  return build;
}

function createQueryStringSerializer(args) {
  var _args$queryStringArra, _args$arraySeparator;

  if (args === void 0) {
    args = {};
  }

  var queryStringArrayFormat = (_args$queryStringArra = args.queryStringArrayFormat) != null ? _args$queryStringArra : "singleKeyWithBracket";
  var arraySeparator = (_args$arraySeparator = args.arraySeparator) != null ? _args$arraySeparator : ",";
  var multiKey = queryStringArrayFormat === "multiKey" || queryStringArrayFormat === "multiKeyWithBracket";
  var arrayKeySuffix = queryStringArrayFormat === "multiKey" || queryStringArrayFormat === "singleKey" ? "" : "[]";
  return {
    parse: function parse(raw) {
      var queryParams = {};

      for (var _iterator = _createForOfIteratorHelperLoose(raw.split("&")), _step; !(_step = _iterator()).done;) {
        var part = _step.value;

        var _part$split = part.split("="),
            rawParamName = _part$split[0],
            rawParamValue = _part$split[1],
            rest = _part$split.slice(2);

        if (rawParamName === undefined || rest.length > 0) {
          continue;
        }

        var key = decodeURIComponent(stringUtils.endsWith(rawParamName, arrayKeySuffix) ? rawParamName.slice(0, rawParamName.length - arrayKeySuffix.length) : rawParamName);

        if (rawParamValue === undefined) {
          queryParams[key] = null;
        } else if (queryParams[key] && multiKey) {
          queryParams[key] += "" + arraySeparator + rawParamValue;
        } else {
          queryParams[key] = rawParamValue;
        }
      }

      return queryParams;
    },
    stringify: function stringify(queryParams) {
      return Object.keys(queryParams).map(function (name) {
        var encodedName = encodeURIComponent(name);
        var key = queryParams[name].array ? "" + encodedName + arrayKeySuffix : encodedName;
        var value = queryParams[name].value;

        if (value === null) {
          return key;
        }

        if (queryParams[name].array && multiKey) {
          var valueParts = value.split(arraySeparator);
          return valueParts.map(function (part) {
            return key + "=" + part;
          }).join("&");
        }

        return key + "=" + value;
      }).join("&");
    }
  };
}

function getMatchingRoute(location, routerContext) {
  var getRoutes = routerContext.getRoutes,
      queryStringSerializer = routerContext.queryStringSerializer,
      arraySeparator = routerContext.arraySeparator;
  var routes = getRoutes();
  var nonExactMatch = false;

  for (var routeName in routes) {
    var match = routes[routeName]["~internal"].match({
      routerLocation: location,
      queryStringSerializer: queryStringSerializer,
      arraySeparator: arraySeparator
    });

    if (match === false) {
      continue;
    }

    if (match.numExtraneousParams === 0) {
      return {
        route: routes[routeName](match.params),
        primaryPath: match.primaryPath
      };
    }

    if (nonExactMatch === false || match.numExtraneousParams < nonExactMatch.numExtraneousParams) {
      nonExactMatch = _extends({}, match, {
        routeName: routeName
      });
    }
  }

  if (nonExactMatch) {
    return {
      route: routes[nonExactMatch.routeName](nonExactMatch.params),
      primaryPath: nonExactMatch.primaryPath
    };
  }

  return {
    route: buildRoute({
      routeName: false,
      params: {},
      location: location,
      routerContext: routerContext
    }),
    primaryPath: true
  };
}

var startsWith$3 = stringUtils.startsWith;
function convertToRouterLocationFromHistoryLocation(rawLocation, baseUrl) {
  return {
    fullPath: rawLocation.pathname,
    path: startsWith$3(rawLocation.pathname, baseUrl) ? baseUrl !== "/" ? rawLocation.pathname.replace(baseUrl, "") : rawLocation.pathname : undefined,
    query: rawLocation.search ? startsWith$3(rawLocation.search, "?") ? rawLocation.search.slice(1) : rawLocation.search : undefined,
    state: typeof rawLocation.state === "object" && rawLocation.state !== null ? rawLocation.state.state : undefined
  };
}

var splitFirst$1 = stringUtils.splitFirst;
function getRouteByHref(href, state, routerContext) {
  var _splitFirst = splitFirst$1(href, "?"),
      pathname = _splitFirst[0],
      search = _splitFirst[1];

  var location = convertToRouterLocationFromHistoryLocation({
    pathname: pathname,
    search: search,
    state: state
  }, routerContext.baseUrl);
  return getMatchingRoute(location, routerContext);
}

function createNavigationHandlerManager(_ref) {
  var startListening = _ref.startListening,
      stopListening = _ref.stopListening;
  var handlerIdList = [];
  var idCounter = 0;
  return {
    add: add,
    getHandlers: getHandlers
  };

  function getHandlers() {
    return handlerIdList.map(function (_ref2) {
      var handler = _ref2.handler;
      return handler;
    });
  }

  function add(handler) {
    var id = idCounter++;
    handlerIdList.push({
      id: id,
      handler: handler
    });

    if (handlerIdList.length === 1) {
      startListening();
    }

    return remove;

    function remove() {
      var index = handlerIdList.map(function (_ref3) {
        var id = _ref3.id;
        return id;
      }).indexOf(id);

      if (index >= 0) {
        handlerIdList.splice(index, 1);

        if (handlerIdList.length === 0) {
          stopListening();
        }
      }
    }
  }
}

function attemptScrollToTop(route, scrollToTop) {
  if (route.action === "push" && typeof window === "object" && window !== null && typeof window.scroll === "function" && scrollToTop !== false && typeof navigator === "object" && navigator !== null && typeof navigator.userAgent === "string" && !(navigator.userAgent.indexOf("Node.js") > 0 || navigator.userAgent.indexOf("jsdom") > 0)) {
    try {
      window.scroll(0, 0);
    } catch (_unused) {}
  }
}

function serializeStateParams(route, routeDefs) {
  var state = {};

  if (route.name) {
    var sortedParams = Object.keys(route.params).sort();

    for (var _iterator = _createForOfIteratorHelperLoose(sortedParams), _step; !(_step = _iterator()).done;) {
      var paramName = _step.value;
      var paramDef = routeDefs[route.name]["~internal"].params[paramName]["~internal"];

      if (paramDef.kind === "state") {
        var value = route.params[paramName];
        state[paramName] = paramDef.valueSerializer.stringify(value);
      }
    }
  }

  return state;
}

var startsWith$4 = stringUtils.startsWith,
    splitFirst$2 = stringUtils.splitFirst;
function createRouter() {
  var _opts$baseUrl, _opts$arrayFormat$sep, _opts$arrayFormat, _opts$queryStringSeri, _opts$arrayFormat2;

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _parseArgs = parseArgs(args),
      routeDefs = _parseArgs.routeDefs,
      opts = _parseArgs.opts;

  var navigationHandlerManager = createNavigationHandlerManager({
    startListening: function startListening() {
      unlisten = history$1.listen(function (update) {
        if (skipNextEnvironmentTriggeredNavigation) {
          skipNextEnvironmentTriggeredNavigation = false;
          return;
        }

        var location = convertToRouterLocationFromHistoryLocation(update.location, baseUrl);
        var action = update.action.toLowerCase();

        var _getMatchingRoute = getMatchingRoute(location, getRouterContext()),
            route = _getMatchingRoute.route,
            primaryPath = _getMatchingRoute.primaryPath;

        handleNavigation(_extends({}, route, {
          action: action
        }), primaryPath);
      });
    },
    stopListening: function stopListening() {
      return unlisten == null ? void 0 : unlisten();
    }
  });
  var baseUrl = (_opts$baseUrl = opts.baseUrl) != null ? _opts$baseUrl : "/";
  var arraySeparator = (_opts$arrayFormat$sep = (_opts$arrayFormat = opts.arrayFormat) == null ? void 0 : _opts$arrayFormat.separator) != null ? _opts$arrayFormat$sep : ",";
  var queryStringSerializer = (_opts$queryStringSeri = opts.queryStringSerializer) != null ? _opts$queryStringSeri : createQueryStringSerializer({
    queryStringArrayFormat: (_opts$arrayFormat2 = opts.arrayFormat) == null ? void 0 : _opts$arrayFormat2.queryString,
    arraySeparator: arraySeparator
  });
  var history$1;
  var unlisten;
  var skipNextEnvironmentTriggeredNavigation = false;
  var skipHandlingNextApplicationTriggeredNavigation = false;
  var initialRoute = null;
  var previousRoute = null;
  var blockerCollection = [];
  applySessionOpts(opts.session);
  var routes = createRouteBuilderCollection(getRouterContext);
  var router = {
    routes: routes,
    session: {
      push: function push(href, state) {
        {
          assert("[RouterSessionHistory].push", [assert.numArgs([].slice.call(arguments), 1, 2), assert.type("string", "href", href), assert.type(["object", "undefined"], "state", state)]);
        }

        var _getRouteByHref = getRouteByHref(href, state, getRouterContext()),
            route = _getRouteByHref.route,
            primaryPath = _getRouteByHref.primaryPath;

        return navigate(_extends({}, route, {
          action: "push"
        }), primaryPath);
      },
      replace: function replace(href, state) {
        {
          assert("[RouterSessionHistory].replace", [assert.numArgs([].slice.call(arguments), 1, 2), assert.type("string", "href", href), assert.type(["object", "undefined"], "state", state)]);
        }

        var _getRouteByHref2 = getRouteByHref(href, state, getRouterContext()),
            route = _getRouteByHref2.route,
            primaryPath = _getRouteByHref2.primaryPath;

        return navigate(_extends({}, route, {
          action: "replace"
        }), primaryPath);
      },
      back: function back(amount) {
        if (amount === void 0) {
          amount = 1;
        }

        {
          assert("[RouterSessionHistory].back", [assert.numArgs([].slice.call(arguments), 0, 1), assert.type("number", "amount", amount)]);
        }

        history$1.go(-amount);
      },
      forward: function forward(amount) {
        if (amount === void 0) {
          amount = 1;
        }

        {
          assert("[RouterSessionHistory].forward", [assert.numArgs([].slice.call(arguments), 0, 1), assert.type("number", "amount", amount)]);
        }

        history$1.go(amount);
      },
      skipNextRender: function skipNextRender() {
        skipHandlingNextApplicationTriggeredNavigation = true;
      },
      getInitialRoute: function getInitialRoute() {
        {
          assert("[RouterSessionHistory].getInitialRoute", [assert.numArgs([].slice.call(arguments), 0)]);
        }

        if (!initialRoute) {
          var result = getMatchingRoute(convertToRouterLocationFromHistoryLocation(history$1.location, baseUrl), getRouterContext());

          if (!result.primaryPath) {
            skipHandlingNextApplicationTriggeredNavigation = true;
            result.route.replace();
            result = getMatchingRoute(convertToRouterLocationFromHistoryLocation(history$1.location, baseUrl), getRouterContext());
          }

          initialRoute = result.route;
        }

        return initialRoute;
      },
      reset: function reset(session) {
        {
          assert("[RouterSessionHistory].reset", [assert.numArgs([].slice.call(arguments), 1), assert.type("object", "session", session)]);
        }

        return applySessionOpts(session);
      },
      block: function block(blocker) {
        blockerCollection.push(blocker);
        var unblock = history$1.block(function (update) {
          var _getMatchingRoute2 = getMatchingRoute(convertToRouterLocationFromHistoryLocation(update.location, baseUrl), getRouterContext()),
              route = _getMatchingRoute2.route;

          var action = update.action.toLowerCase();
          blocker({
            route: _extends({}, route, {
              action: action
            }),
            retry: update.retry
          });
        });
        return function () {
          blockerCollection.splice(blockerCollection.findIndex(function (item) {
            return item === blocker;
          }), 1);
          unblock();
        };
      },
      listen: function listen(handler) {
        return navigationHandlerManager.add(handler);
      }
    }
  };
  return router;

  function applySessionOpts(sessionOpts) {
    if (sessionOpts === void 0) {
      sessionOpts = {
        type: typeof window !== "undefined" && typeof window.document !== "undefined" ? "browser" : "memory"
      };
    }

    initialRoute = null;

    if (sessionOpts.type === "memory") {
      history$1 = history.createMemoryHistory({
        initialEntries: sessionOpts.initialEntries,
        initialIndex: sessionOpts.initialIndex
      });
    } else if (sessionOpts.type === "hash") {
      history$1 = history.createHashHistory({
        window: sessionOpts.window
      });
    } else {
      history$1 = history.createBrowserHistory({
        window: sessionOpts.window
      });
    }
  }

  function navigate(route, primaryPath) {
    var _previousRoute;

    if (blockerCollection.length > 0) {
      blockerCollection.forEach(function (blocker) {
        blocker({
          route: route,
          retry: function retry() {
            route[route.action === "push" ? "push" : "replace"]();
          }
        });
      });
      return;
    }

    var state = serializeStateParams(route, routeDefs);

    if (((_previousRoute = previousRoute) == null ? void 0 : _previousRoute.href) === route.href && JSON.stringify(serializeStateParams(previousRoute, routeDefs)) === JSON.stringify(state)) {
      return;
    }

    if (skipHandlingNextApplicationTriggeredNavigation) {
      skipHandlingNextApplicationTriggeredNavigation = false;
    } else {
      handleNavigation(route, primaryPath);
    }

    skipNextEnvironmentTriggeredNavigation = true;

    var _splitFirst = splitFirst$2(route.href, "?"),
        pathname = _splitFirst[0],
        search = _splitFirst[1];

    history$1[route.action === "replace" ? "replace" : "push"]({
      pathname: pathname,
      search: search ? "?" + search : "",
      hash: ""
    }, state ? {
      state: state
    } : undefined);
  }

  function handleNavigation(route, primaryPath) {
    if (!primaryPath) {
      route.replace();
      return;
    }

    for (var _iterator = _createForOfIteratorHelperLoose(navigationHandlerManager.getHandlers()), _step; !(_step = _iterator()).done;) {
      var handler = _step.value;
      handler(route);
    }

    attemptScrollToTop(route, opts.scrollToTop);
    previousRoute = route;
  }

  function getRouterContext() {
    return {
      queryStringSerializer: queryStringSerializer,
      arraySeparator: arraySeparator,
      navigate: navigate,
      history: history$1,
      routeDefs: routeDefs,
      getRoutes: function getRoutes() {
        return routes;
      },
      baseUrl: baseUrl
    };
  }
}
function parseArgs(args) {
  var routeDefs = args.length === 1 ? args[0] : args[1];
  var opts = args.length === 1 ? {} : args[0];

  {
    var _opts$arrayFormat3;

    assert("createRouter", [assert.numArgs(args, 1, 2), assert.collectionOfType("RouteDef", "routeDefs", routeDefs), assert.type("object", "opts", opts)]);

    if ((_opts$arrayFormat3 = opts.arrayFormat) != null && _opts$arrayFormat3.queryString && opts.queryStringSerializer) {
      throw TypeRouteError.Query_string_array_format_and_custom_query_string_serializer_may_not_both_be_provided.create();
    }

    if (typeof opts.baseUrl === "string") {
      if (!startsWith$4(opts.baseUrl, "/")) {
        throw TypeRouteError.Base_url_must_start_with_a_forward_slash.create(opts.baseUrl);
      }

      if (opts.baseUrl.split("/").some(function (part) {
        return encodeURIComponent(part) !== part;
      })) {
        throw TypeRouteError.Base_url_must_not_contain_any_characters_that_must_be_url_encoded.create(opts.baseUrl);
      }
    }
  }

  return {
    routeDefs: routeDefs,
    opts: opts
  };
}

function createRouteBuilderCollection(getRouterContext) {
  var routes = {};

  var _getRouterContext = getRouterContext(),
      routeDefs = _getRouterContext.routeDefs;

  for (var routeName in routeDefs) {
    var routeDef = routeDefs[routeName];
    routes[routeName] = createRouteBuilder(routeName, routeDef, getRouterContext);
  }

  return routes;
}

function defineRoute() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  assertDefineRouteOrExtendArgs("defineRoute", args);
  var parent = parseArgs$1(args);
  var routeDef = {
    "~internal": {
      type: "RouteDef",
      params: parent.params,
      path: parent.path
    },
    extend: function extend() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      assertDefineRouteOrExtendArgs("extend", args);

      var _parseArgs = parseArgs$1(args),
          params = _parseArgs.params,
          path = _parseArgs.path;

      var parentParamNames = Object.keys(parent.params);
      var extensionParamNames = Object.keys(params);
      var duplicateParamNames = parentParamNames.filter(function (name) {
        return extensionParamNames.indexOf(name) >= 0;
      });

      {
        if (duplicateParamNames.length > 0) {
          throw TypeRouteError.Extension_route_definition_parameter_names_may_not_be_the_same_as_base_route_definition_parameter_names.create(duplicateParamNames);
        }
      }

      return defineRoute(_extends({}, params, parent.params), function (x) {
        var _ref;

        var parentPathArray = asArray(parent.path(filter(parentParamNames)));
        var childPathArray = asArray(path(filter(extensionParamNames)));
        return (_ref = []).concat.apply(_ref, parentPathArray.map(function (parentPath) {
          return childPathArray.map(function (childPath) {
            if (parentPath === "/") {
              return childPath;
            }

            return parentPath + (childPath === "/" ? "" : childPath);
          });
        }));

        function filter(allowedKeys) {
          var filteredX = {};
          allowedKeys.forEach(function (key) {
            filteredX[key] = x[key];
          });
          return filteredX;
        }
      });
    }
  };
  return routeDef;
}

function assertDefineRouteOrExtendArgs(functionName, args) {
  {
    if (args.length === 1) {
      if (Array.isArray(args[0])) {
        assert(functionName, [assert.arrayOfType("string", "path", args[0])]);
      } else {
        assert(functionName, [assert.type("string", "path", args[0])]);
      }
    } else {
      assert(functionName, [assert.numArgs(args, 1, 2), assert.collectionOfType("ParamDef", "params", args[0]), assert.type("function", "path", args[1])]);
    }
  }
}

function parseArgs$1(args) {
  return args.length === 1 ? {
    params: {},
    path: function path() {
      return args[0];
    }
  } : {
    params: args[0],
    path: args[1]
  };
}

var _boolean = {
  id: "boolean",
  parse: function parse(raw) {
    return raw === "true" ? true : raw === "false" ? false : noMatch;
  },
  stringify: function stringify(value) {
    return value ? "true" : "false";
  }
};
var number = {
  id: "number",
  parse: function parse(raw) {
    if (!isNumeric(raw)) {
      return noMatch;
    }

    return parseFloat(raw);
  },
  stringify: function stringify(value) {
    return value.toString();
  }
};

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && /^-?\d*\.?\d*$/.test(value);
}

var string = {
  id: "string",
  parse: function parse(raw) {
    return raw;
  },
  stringify: function stringify(value) {
    return value;
  }
};

var json = function json() {
  var valueSerializer = {
    id: "json",
    parse: function parse(raw) {
      var value;

      try {
        value = JSON.parse(raw);
      } catch (_unused) {
        return noMatch;
      }

      return value;
    },
    stringify: function stringify(value) {
      return JSON.stringify(value);
    }
  };
  return valueSerializer;
};

var param = {
  path: /*#__PURE__*/_extends({}, /*#__PURE__*/getParamDefKindSection("path", false), {
    trailing: /*#__PURE__*/getParamDefKindSection("path", true)
  }),
  query: /*#__PURE__*/getParamDefKindSection("query", false),
  state: /*#__PURE__*/getParamDefKindSection("state", false)
};

function getParamDefKindSection(kind, trailing) {
  return _extends({}, getParamDefOptionalitySection(false, false), {
    array: getParamDefOptionalitySection(false, true),
    optional: _extends({}, getParamDefOptionalitySection(true, false), {
      array: getParamDefOptionalitySection(true, true)
    })
  });

  function getParamDefOptionalitySection(optional, array) {
    return {
      string: getParamDef({
        "~internal": {
          type: "ParamDef",
          array: array,
          kind: kind,
          optional: optional,
          valueSerializer: string,
          trailing: trailing,
          "default": undefined
        }
      }),
      number: getParamDef({
        "~internal": {
          type: "ParamDef",
          array: array,
          kind: kind,
          optional: optional,
          valueSerializer: number,
          trailing: trailing,
          "default": undefined
        }
      }),
      "boolean": getParamDef({
        "~internal": {
          type: "ParamDef",
          array: array,
          kind: kind,
          optional: optional,
          valueSerializer: _boolean,
          trailing: trailing,
          "default": undefined
        }
      }),
      ofType: function ofType(valueSerializer) {
        if (valueSerializer === void 0) {
          valueSerializer = json();
        }

        {
          assert("[ParamDef].ofType", [assert.numArgs([].slice.call(arguments), 0, 1), assert.type("object", "valueSerializer", valueSerializer)]);
        }

        return getParamDef({
          "~internal": {
            type: "ParamDef",
            array: array,
            kind: kind,
            optional: optional,
            valueSerializer: valueSerializer,
            trailing: trailing,
            "default": undefined
          }
        });
      }
    };
  }

  function getParamDef(_ref) {
    var internal = _ref["~internal"];

    if (!internal.optional) {
      return {
        "~internal": internal
      };
    }

    return {
      "~internal": internal,
      "default": function _default(value) {
        {
          assert("[ParamDef].default", [assert.numArgs([].slice.call(arguments), 1)]);
        }

        return {
          "~internal": _extends({}, internal, {
            "default": value
          })
        };
      }
    };
  }
}

function createGroup(groupItems) {
  {
    assert("createGroup", [assert.numArgs([].slice.call(arguments), 1), assert.arrayOfType(["RouteGroup", "RouteBuilder"], "groupItems", groupItems)]);
  }

  var routeNames = {};
  groupItems.forEach(function (item) {
    if (isRouteGroup(item)) {
      item.routeNames.forEach(function (name) {
        routeNames[name] = true;
      });
    } else {
      routeNames[item.name] = true;
    }
  });
  return {
    "~internal": {
      type: "RouteGroup",
      Route: null
    },
    routeNames: Object.keys(routeNames),
    has: function has(route) {
      {
        assert("[RouteGroup].has", [assert.numArgs([].slice.call(arguments), 1), assert.type("object", "route", route)]);
      }

      if (route.name === false) {
        return false;
      }

      return !!routeNames[route.name];
    }
  };
}

function isRouteGroup(value) {
  return !!value.routeNames;
}

{
  var _React$version$split$ = /*#__PURE__*/React.version.split(".").map(function (value) {
    return parseInt(value, 10);
  }),
      major = _React$version$split$[0],
      minor = _React$version$split$[1];

  if (major < 16 || major === 16 && minor < 8) {
    throw TypeRouteError.Invalid_React_version.create(React.version);
  }
}
function createRouter$1() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _parseArgs = parseArgs(args),
      opts = _parseArgs.opts,
      routeDefs = _parseArgs.routeDefs;

  var router = createRouter(_extends({}, opts, {
    scrollToTop: false
  }), routeDefs);
  var routeContext = React.createContext(null);
  return _extends({}, router, {
    RouteProvider: RouteProvider,
    useRoute: useRoute
  });

  function RouteProvider(props) {
    var _React$useState = React.useState(router.session.getInitialRoute()),
        route = _React$useState[0],
        setRoute = _React$useState[1];

    React.useLayoutEffect(function () {
      return router.session.listen(setRoute);
    }, []);
    React.useEffect(function () {
      attemptScrollToTop(route, opts.scrollToTop);
    }, [route]);
    return React.createElement(routeContext.Provider, {
      value: route
    }, props.children);
  }

  function useRoute() {
    var route = React.useContext(routeContext);

    {
      if (route === null) {
        throw TypeRouteError.App_should_be_wrapped_in_a_RouteProvider_component.create();
      }
    }

    return route;
  }
}

exports.createGroup = createGroup;
exports.createRouter = createRouter$1;
exports.defineRoute = defineRoute;
exports.noMatch = noMatch;
exports.param = param;
exports.preventDefaultLinkClickBehavior = preventDefaultLinkClickBehavior;
//# sourceMappingURL=type-route.cjs.development.js.map
