declare const noMatch: {
    readonly __noMatch: true;
};

declare type NavigateOptions = {
    skipRender?: boolean;
};
declare type Compute<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
declare type KeysMatching<TObject, TCondition> = {
    [TKey in keyof TObject]: TObject[TKey] extends TCondition ? TKey : never;
}[keyof TObject];
declare type KeysDiffering<TObject, TCondition> = {
    [TKey in keyof TObject]: TObject[TKey] extends TCondition ? never : TKey;
}[keyof TObject];
/**
 * Object for configuring a custom query string serializer. You likely
 * do not need this level of customization for your application.
 *
 * @see https://type-route.zilch.dev/api-reference/types/query-string-serializer
 */
declare type QueryStringSerializer = {
    /**
     * Accepts the query string (without the leading ?) and returns
     * a mapping of parameter names to unserialized parameter values.
     * Individual parameter value serializer take care of the parsing
     * parameter values. A null value indicates an empty array.
     *
     * @see https://type-route.zilch.dev/api-reference/types/query-string-serializer
     */
    parse: (raw: string) => Record<string, string | null>;
    /**
     * Accepts an object keyed by query parameter names and generates
     * a stringified version of the object. A null value indicates an
     * empty array.
     *
     * @see https://type-route.zilch.dev/api-reference/types/query-string-serializer
     */
    stringify: (queryParams: Record<string, {
        valueSerializerId?: string;
        array: boolean;
        value: string | null;
    }>) => string;
};
/**
 * Object for configuring a custom parameter value serializer.
 *
 * @see https://type-route.zilch.dev/api-reference/types/value-serializer
 */
declare type ValueSerializer<TValue = unknown> = {
    id?: string;
    urlEncode?: boolean;
    parse(raw: string): TValue | typeof noMatch;
    stringify(value: TValue): string;
};
declare type ParamDef<TParamDefKind, TValue = unknown> = {
    ["~internal"]: {
        type: "ParamDef";
        kind: TParamDefKind;
        valueSerializer: ValueSerializer<TValue>;
        array: boolean;
        optional: boolean;
        default: TValue | undefined;
        trailing?: boolean;
    };
};
declare type PathParamDef<TValue = unknown> = ParamDef<"path", TValue>;
declare type NamedPathParamDef<TValue = unknown> = PathParamDef<TValue> & {
    paramName: string;
};
declare type RouterLocation = {
    fullPath: string;
    path?: string;
    query?: string;
    state?: Record<string, string>;
};
declare type PathSegmentDef = {
    leading: string;
    trailing: string;
    namedParamDef: NamedPathParamDef | null;
};
declare type PathDef = PathSegmentDef[];
declare type PathParamNames<TParamDefCollection> = KeysMatching<TParamDefCollection, {
    ["~internal"]: {
        kind: "path";
    };
}>;
declare type OptionalParamNames<TParamDefCollection> = KeysMatching<TParamDefCollection, {
    ["~internal"]: {
        optional: true;
    };
}>;
declare type RequiredParamNames<TParamDefCollection> = KeysMatching<TParamDefCollection, {
    ["~internal"]: {
        optional: false;
    };
}>;
declare type RequiredOutputParamsNames<TParamDefCollection> = RequiredParamNames<TParamDefCollection> | KeysDiffering<TParamDefCollection, {
    ["~internal"]: {
        optional: true;
        default: undefined;
    };
}>;
declare type OptionalOutputParamsNames<TParamDefCollection> = Exclude<keyof TParamDefCollection, RequiredOutputParamsNames<TParamDefCollection>>;
declare type ParamValue<TParamDef> = TParamDef extends {
    "~internal": {
        array: boolean;
        valueSerializer: ValueSerializer<infer TValue>;
    };
} ? TParamDef["~internal"]["array"] extends true ? TValue[] : TValue : never;
declare type InputRouteParams<TParamDefCollection> = Compute<Pick<{
    [TParamName in keyof TParamDefCollection]: ParamValue<TParamDefCollection[TParamName]>;
}, RequiredParamNames<TParamDefCollection>> & Pick<{
    [TParamName in keyof TParamDefCollection]?: ParamValue<TParamDefCollection[TParamName]>;
}, OptionalParamNames<TParamDefCollection>>>;
declare type OutputRouteParams<TParamDefCollection> = Compute<Pick<{
    [TParamName in keyof TParamDefCollection]?: ParamValue<TParamDefCollection[TParamName]>;
}, OptionalOutputParamsNames<TParamDefCollection>> & Pick<{
    [TParamName in keyof TParamDefCollection]: ParamValue<TParamDefCollection[TParamName]>;
}, RequiredOutputParamsNames<TParamDefCollection>>>;
declare type PathParams<TParamDefCollection> = {
    [TParamName in PathParamNames<TParamDefCollection>]: string;
};
declare type PathFn<TParamDefCollection> = (x: PathParams<TParamDefCollection>) => string | string[];
declare type RouteDef<TParamDefCollection> = {
    ["~internal"]: {
        type: "RouteDef";
        params: TParamDefCollection;
        path: PathFn<TParamDefCollection>;
    };
    /**
     * Create a new route definition by extending the current one.
     *
     * @see https://type-route.zilch.dev/api-reference/route-definition/extend
     */
    extend<TExtensionParamDefCollection>(params: TExtensionParamDefCollection, path: PathFn<TExtensionParamDefCollection>): RouteDef<TParamDefCollection & TExtensionParamDefCollection>;
    /**
     * Create a new route definition by extending the current one.
     *
     * @see https://type-route.zilch.dev/api-reference/route-definition/extend
     */
    extend(path: string | string[]): RouteDef<TParamDefCollection>;
};
declare type OnClickHandler = (event?: any) => void;
declare type Link = {
    href: string;
    onClick: OnClickHandler;
};
declare type RouteParamsFunction<TParamDefCollection, TReturnType> = KeysMatching<TParamDefCollection, {}> extends never ? () => TReturnType : RequiredParamNames<TParamDefCollection> extends never ? (params?: InputRouteParams<TParamDefCollection>) => TReturnType : (params: InputRouteParams<TParamDefCollection>) => TReturnType;
declare type Match = {
    params: Record<string, unknown>;
    numExtraneousParams: number;
    primaryPath: boolean;
};
declare type RouteBuilder<TRouteName, TParamDefCollection> = RouteParamsFunction<TParamDefCollection, Route<TRouteName, TParamDefCollection>> & {
    /**
     * Name of the route
     */
    name: TRouteName;
    ["~internal"]: {
        type: "RouteBuilder";
        match: (args: {
            routerLocation: RouterLocation;
            queryStringSerializer: QueryStringSerializer;
            arraySeparator: string;
        }) => Match | false;
        pathDefs: PathDef[];
        Route: Route<TRouteName, TParamDefCollection>;
    };
};
declare type Action = "push" | "replace" | "pop";
declare type RouteDefCollectionRoute<TRouteDefCollection> = TRouteDefCollection extends Record<string, RouteDef<any>> ? {
    [TRouteName in keyof TRouteDefCollection]: Route<TRouteName, TRouteDefCollection[TRouteName]["~internal"]["params"]>;
}[keyof TRouteDefCollection] | NotFoundRoute : never;
declare type NotFoundRoute = Route<false, {}>;
declare type Route<TName, TParamDefCollection> = {
    /**
     * Name of the route.
     */
    name: TName;
    /**
     * Route parameters.
     */
    params: OutputRouteParams<TParamDefCollection>;
    /**
     * How the current route was navigated to.
     * - "push" indicates your application added this route.
     * - "replace" also indicates your application added this route.
     * - "pop" indicates the browser navigated to this route (think
     *    back/forward buttons)
     * - null indicates the route has not yet been navigated to or
     *   its action was not able to be determined (as is the case with
     *   session.getInitialRoute() )
     */
    action: Action | null;
    /**
     * Helper for constructing links
     *
     * @see https://type-route.zilch.dev/guides/rendering-links
     */
    link: Link;
    /**
     * The href of the current route without domain but including
     * path, query string, and hash.
     */
    href: string;
    /**
     * Pushes a new route onto the history stack, increasing its length by one.
     * If there were any entries in the stack after the current one, they are
     * lost.
     */
    push: (options?: NavigateOptions) => void;
    /**
     * Replaces the current route in the history stack with this one.
     */
    replace: (options?: NavigateOptions) => void;
};
/**
 * Helper to retrieve a Route type.
 *
 * @see https://type-route.zilch.dev/api-reference/types/route
 */
declare type GetRoute<T> = T extends {
    ["~internal"]: {
        Route: any;
    };
} ? T["~internal"]["Route"] : T extends Record<string, {
    ["~internal"]: {
        Route: any;
    };
}> ? T[keyof T]["~internal"]["Route"] | NotFoundRoute : never;
declare type NavigationHandler<TRouteDefCollection> = (route: RouteDefCollectionRoute<TRouteDefCollection>) => void;
declare type Unblock = () => void;
declare type Blocker<TRouteDefCollection> = (update: {
    /**
     * The route that would have been navigated to had navigation
     * not been blocked.
     */
    route: RouteDefCollectionRoute<TRouteDefCollection>;
    /**
     * Retry the navigation attempt. Typically is used after getting
     * user confirmation to leave and then unblocking navigation.
     */
    retry: () => void;
}) => void;
/**
 * Functions for interacting with the current history session.
 */
declare type RouterSession<TRouteDefCollection> = {
    /**
     * Manually add a new item to the history stack.
     */
    push(href: string, state?: any, options?: NavigateOptions): void;
    /**
     * Replace the currently active item in the history stack.
     */
    replace(href: string, state?: any, options?: NavigateOptions): void;
    /**
     * Get the initial route. Useful for bootstrapping your application.
     */
    getInitialRoute(): RouteDefCollectionRoute<TRouteDefCollection>;
    /**
     * Move back in history the specified amount.
     */
    back(amount?: number): void;
    /**
     * Move forward in history the specified amount.
     */
    forward(amount?: number): void;
    /**
     * Reconfigures the underlying history instance. Can be useful
     * when using server-side rendering.
     *
     * @see https://type-route.zilch.dev/guides/server-side-rendering
     */
    reset(options: SessionOpts): void;
    /**
     * Blocks navigation and registers a listener that is called when
     * navigation is blocked. Returns a function to unblock navigation.
     *
     * @see https://type-route.zilch.dev/guides/preventing-navigation
     */
    block(blocker: Blocker<TRouteDefCollection>): Unblock;
    /**
     * Registers a listener that is called when navigation occurs.
     * Returns a function to remove the navigation listener.
     */
    listen(handler: NavigationHandler<TRouteDefCollection>): Unlisten;
};
declare type MemoryHistorySessionOpts = {
    type: "memory";
    /**
     * An array of urls representing the what items should
     * start in history when the router is created. This can be useful
     * in a variety of scenarios including server-side rendering
     * (https://type-route.zilch.dev/guides/server-side-rendering).
     */
    initialEntries?: string[];
    /**
     * The index of the current url entry when the router is created.
     */
    initialIndex?: number;
};
declare type HashHistorySessionOpts = {
    type: "hash";
    /**
     * Provide a custom window function to operate on. Can be useful when
     * using the route in an iframe.
     */
    window?: Window;
};
declare type BrowserHistorySessionOpts = {
    type: "browser";
    /**
     * Provide a custom window function to operate on. Can be useful when
     * using the route in an iframe.
     */
    window?: Window;
};
declare type SessionOpts = HashHistorySessionOpts | MemoryHistorySessionOpts | BrowserHistorySessionOpts;
declare type QueryStringArrayFormat = "singleKey" | "singleKeyWithBracket" | "multiKey" | "multiKeyWithBracket";
declare type ArrayFormat = {
    /**
     * Separator to use for array parameter types. By default ","
     */
    separator?: string;
    /**
     * Query string serialization method.
     *
     * @see https://type-route.zilch.dev/guides/custom-query-string
     */
    queryString?: QueryStringArrayFormat;
};
declare type RouterOpts = {
    /**
     * Options for what variety of browser history session you're using.
     * There are three types with additional options depending on the
     * session type: "browser", "hash", and "memory".
     */
    session?: SessionOpts;
    /**
     * A custom serializer/deserializer for the query string. This is an
     * advanced feature your application likely does not need.
     *
     * @see https://type-route.zilch.dev/guides/custom-query-string
     */
    queryStringSerializer?: QueryStringSerializer;
    /**
     * Object used to configure how arrays are serialized to the url.
     */
    arrayFormat?: ArrayFormat;
    /**
     * A path segment that precedes every route in your application. When using a "hash"
     * router this segment will come before the "#" symbol.
     */
    baseUrl?: string;
    /**
     * If the application should scroll to the top of the page when a new route
     * is pushed onto the history stack. Defaults to true for applications running
     * in a web browser.
     */
    scrollToTop?: boolean;
};
declare type Unlisten = {
    (): void;
};
declare type CoreRouter<TRouteDefCollection extends {
    [routeName: string]: any;
}> = {
    /**
     * Collection of route builders.
     */
    routes: {
        [TRouteName in keyof TRouteDefCollection]: RouteBuilder<TRouteName, TRouteDefCollection[TRouteName]["~internal"]["params"]>;
    };
    session: RouterSession<TRouteDefCollection>;
};
declare type RouteGroup<T extends any[] = any[]> = {
    ["~internal"]: {
        type: "RouteGroup";
        Route: T[number]["~internal"]["Route"];
    };
    routeNames: T[number]["~internal"]["Route"]["name"][];
    /**
     * Accepts a route and returns whether or not it is part
     * of this group.
     *
     * @see https://type-route.zilch.dev/api-reference/route-group/has
     */
    has(route: Route<any, any>): route is T[number]["~internal"]["Route"];
};

declare function createRouter<TRouteDefCollection extends {
    [routeName: string]: any;
}>(routeDefs: TRouteDefCollection): CoreRouter<TRouteDefCollection>;
declare function createRouter<TRouteDefCollection extends {
    [routeName: string]: any;
}>(opts: RouterOpts, routeDefs: TRouteDefCollection): CoreRouter<TRouteDefCollection>;

declare function defineRoute<TParamDefCollection>(params: TParamDefCollection, path: PathFn<TParamDefCollection>): RouteDef<TParamDefCollection>;
declare function defineRoute(path: string | string[]): RouteDef<{}>;

declare const param: {
    path: {
        trailing: {
            array: {
                string: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "path";
                        optional: false;
                        valueSerializer: ValueSerializer<string>;
                        trailing: true;
                        default: never;
                    };
                };
                number: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "path";
                        optional: false;
                        valueSerializer: ValueSerializer<number>;
                        trailing: true;
                        default: never;
                    };
                };
                boolean: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "path";
                        optional: false;
                        valueSerializer: ValueSerializer<boolean>;
                        trailing: true;
                        default: never;
                    };
                };
                ofType<TValue = unknown>(valueSerializer?: ValueSerializer<TValue>): {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "path";
                        optional: false;
                        valueSerializer: ValueSerializer<TValue>;
                        trailing: true;
                        default: never;
                    };
                };
            };
            optional: {
                array: {
                    string: {
                        "~internal": {
                            type: "ParamDef";
                            array: true;
                            kind: "path";
                            optional: true;
                            valueSerializer: ValueSerializer<string>;
                            trailing: true;
                            default: never;
                        };
                        default(value: string[]): {
                            "~internal": {
                                type: "ParamDef";
                                kind: "path";
                                array: true;
                                valueSerializer: ValueSerializer<string>;
                                optional: true;
                                default: string[];
                                trailing: true;
                            };
                        };
                    };
                    number: {
                        "~internal": {
                            type: "ParamDef";
                            array: true;
                            kind: "path";
                            optional: true;
                            valueSerializer: ValueSerializer<number>;
                            trailing: true;
                            default: never;
                        };
                        default(value: number[]): {
                            "~internal": {
                                type: "ParamDef";
                                kind: "path";
                                array: true;
                                valueSerializer: ValueSerializer<number>;
                                optional: true;
                                default: number[];
                                trailing: true;
                            };
                        };
                    };
                    boolean: {
                        "~internal": {
                            type: "ParamDef";
                            array: true;
                            kind: "path";
                            optional: true;
                            valueSerializer: ValueSerializer<boolean>;
                            trailing: true;
                            default: never;
                        };
                        default(value: boolean[]): {
                            "~internal": {
                                type: "ParamDef";
                                kind: "path";
                                array: true;
                                valueSerializer: ValueSerializer<boolean>;
                                optional: true;
                                default: boolean[];
                                trailing: true;
                            };
                        };
                    };
                    ofType<TValue_1 = unknown>(valueSerializer?: ValueSerializer<TValue_1>): {
                        "~internal": {
                            type: "ParamDef";
                            array: true;
                            kind: "path";
                            optional: true;
                            valueSerializer: ValueSerializer<TValue_1>;
                            trailing: true;
                            default: never;
                        };
                        default(value: TValue_1[]): {
                            "~internal": {
                                type: "ParamDef";
                                kind: "path";
                                array: true;
                                valueSerializer: ValueSerializer<TValue_1>;
                                optional: true;
                                default: TValue_1[];
                                trailing: true;
                            };
                        };
                    };
                };
                string: {
                    "~internal": {
                        type: "ParamDef";
                        array: false;
                        kind: "path";
                        optional: true;
                        valueSerializer: ValueSerializer<string>;
                        trailing: true;
                        default: never;
                    };
                    default(value: string): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "path";
                            array: false;
                            valueSerializer: ValueSerializer<string>;
                            optional: true;
                            default: string;
                            trailing: true;
                        };
                    };
                };
                number: {
                    "~internal": {
                        type: "ParamDef";
                        array: false;
                        kind: "path";
                        optional: true;
                        valueSerializer: ValueSerializer<number>;
                        trailing: true;
                        default: never;
                    };
                    default(value: number): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "path";
                            array: false;
                            valueSerializer: ValueSerializer<number>;
                            optional: true;
                            default: number;
                            trailing: true;
                        };
                    };
                };
                boolean: {
                    "~internal": {
                        type: "ParamDef";
                        array: false;
                        kind: "path";
                        optional: true;
                        valueSerializer: ValueSerializer<boolean>;
                        trailing: true;
                        default: never;
                    };
                    default(value: boolean): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "path";
                            array: false;
                            valueSerializer: ValueSerializer<boolean>;
                            optional: true;
                            default: boolean;
                            trailing: true;
                        };
                    };
                };
                ofType<TValue_2 = unknown>(valueSerializer?: ValueSerializer<TValue_2>): {
                    "~internal": {
                        type: "ParamDef";
                        array: false;
                        kind: "path";
                        optional: true;
                        valueSerializer: ValueSerializer<TValue_2>;
                        trailing: true;
                        default: never;
                    };
                    default(value: TValue_2): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "path";
                            array: false;
                            valueSerializer: ValueSerializer<TValue_2>;
                            optional: true;
                            default: TValue_2;
                            trailing: true;
                        };
                    };
                };
            };
            string: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "path";
                    optional: false;
                    valueSerializer: ValueSerializer<string>;
                    trailing: true;
                    default: never;
                };
            };
            number: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "path";
                    optional: false;
                    valueSerializer: ValueSerializer<number>;
                    trailing: true;
                    default: never;
                };
            };
            boolean: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "path";
                    optional: false;
                    valueSerializer: ValueSerializer<boolean>;
                    trailing: true;
                    default: never;
                };
            };
            ofType<TValue_3 = unknown>(valueSerializer?: ValueSerializer<TValue_3>): {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "path";
                    optional: false;
                    valueSerializer: ValueSerializer<TValue_3>;
                    trailing: true;
                    default: never;
                };
            };
        };
        array: {
            string: {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "path";
                    optional: false;
                    valueSerializer: ValueSerializer<string>;
                    trailing: false;
                    default: never;
                };
            };
            number: {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "path";
                    optional: false;
                    valueSerializer: ValueSerializer<number>;
                    trailing: false;
                    default: never;
                };
            };
            boolean: {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "path";
                    optional: false;
                    valueSerializer: ValueSerializer<boolean>;
                    trailing: false;
                    default: never;
                };
            };
            ofType<TValue_4 = unknown>(valueSerializer?: ValueSerializer<TValue_4>): {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "path";
                    optional: false;
                    valueSerializer: ValueSerializer<TValue_4>;
                    trailing: false;
                    default: never;
                };
            };
        };
        optional: {
            array: {
                string: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "path";
                        optional: true;
                        valueSerializer: ValueSerializer<string>;
                        trailing: false;
                        default: never;
                    };
                    default(value: string[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "path";
                            array: true;
                            valueSerializer: ValueSerializer<string>;
                            optional: true;
                            default: string[];
                            trailing: false;
                        };
                    };
                };
                number: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "path";
                        optional: true;
                        valueSerializer: ValueSerializer<number>;
                        trailing: false;
                        default: never;
                    };
                    default(value: number[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "path";
                            array: true;
                            valueSerializer: ValueSerializer<number>;
                            optional: true;
                            default: number[];
                            trailing: false;
                        };
                    };
                };
                boolean: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "path";
                        optional: true;
                        valueSerializer: ValueSerializer<boolean>;
                        trailing: false;
                        default: never;
                    };
                    default(value: boolean[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "path";
                            array: true;
                            valueSerializer: ValueSerializer<boolean>;
                            optional: true;
                            default: boolean[];
                            trailing: false;
                        };
                    };
                };
                ofType<TValue_5 = unknown>(valueSerializer?: ValueSerializer<TValue_5>): {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "path";
                        optional: true;
                        valueSerializer: ValueSerializer<TValue_5>;
                        trailing: false;
                        default: never;
                    };
                    default(value: TValue_5[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "path";
                            array: true;
                            valueSerializer: ValueSerializer<TValue_5>;
                            optional: true;
                            default: TValue_5[];
                            trailing: false;
                        };
                    };
                };
            };
            string: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "path";
                    optional: true;
                    valueSerializer: ValueSerializer<string>;
                    trailing: false;
                    default: never;
                };
                default(value: string): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "path";
                        array: false;
                        valueSerializer: ValueSerializer<string>;
                        optional: true;
                        default: string;
                        trailing: false;
                    };
                };
            };
            number: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "path";
                    optional: true;
                    valueSerializer: ValueSerializer<number>;
                    trailing: false;
                    default: never;
                };
                default(value: number): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "path";
                        array: false;
                        valueSerializer: ValueSerializer<number>;
                        optional: true;
                        default: number;
                        trailing: false;
                    };
                };
            };
            boolean: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "path";
                    optional: true;
                    valueSerializer: ValueSerializer<boolean>;
                    trailing: false;
                    default: never;
                };
                default(value: boolean): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "path";
                        array: false;
                        valueSerializer: ValueSerializer<boolean>;
                        optional: true;
                        default: boolean;
                        trailing: false;
                    };
                };
            };
            ofType<TValue_6 = unknown>(valueSerializer?: ValueSerializer<TValue_6>): {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "path";
                    optional: true;
                    valueSerializer: ValueSerializer<TValue_6>;
                    trailing: false;
                    default: never;
                };
                default(value: TValue_6): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "path";
                        array: false;
                        valueSerializer: ValueSerializer<TValue_6>;
                        optional: true;
                        default: TValue_6;
                        trailing: false;
                    };
                };
            };
        };
        string: {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "path";
                optional: false;
                valueSerializer: ValueSerializer<string>;
                trailing: false;
                default: never;
            };
        };
        number: {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "path";
                optional: false;
                valueSerializer: ValueSerializer<number>;
                trailing: false;
                default: never;
            };
        };
        boolean: {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "path";
                optional: false;
                valueSerializer: ValueSerializer<boolean>;
                trailing: false;
                default: never;
            };
        };
        ofType<TValue_7 = unknown>(valueSerializer?: ValueSerializer<TValue_7>): {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "path";
                optional: false;
                valueSerializer: ValueSerializer<TValue_7>;
                trailing: false;
                default: never;
            };
        };
    };
    query: {
        array: {
            string: {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "query";
                    optional: false;
                    valueSerializer: ValueSerializer<string>;
                    trailing: false;
                    default: never;
                };
            };
            number: {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "query";
                    optional: false;
                    valueSerializer: ValueSerializer<number>;
                    trailing: false;
                    default: never;
                };
            };
            boolean: {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "query";
                    optional: false;
                    valueSerializer: ValueSerializer<boolean>;
                    trailing: false;
                    default: never;
                };
            };
            ofType<TValue_8 = unknown>(valueSerializer?: ValueSerializer<TValue_8>): {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "query";
                    optional: false;
                    valueSerializer: ValueSerializer<TValue_8>;
                    trailing: false;
                    default: never;
                };
            };
        };
        optional: {
            array: {
                string: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "query";
                        optional: true;
                        valueSerializer: ValueSerializer<string>;
                        trailing: false;
                        default: never;
                    };
                    default(value: string[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "query";
                            array: true;
                            valueSerializer: ValueSerializer<string>;
                            optional: true;
                            default: string[];
                            trailing: false;
                        };
                    };
                };
                number: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "query";
                        optional: true;
                        valueSerializer: ValueSerializer<number>;
                        trailing: false;
                        default: never;
                    };
                    default(value: number[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "query";
                            array: true;
                            valueSerializer: ValueSerializer<number>;
                            optional: true;
                            default: number[];
                            trailing: false;
                        };
                    };
                };
                boolean: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "query";
                        optional: true;
                        valueSerializer: ValueSerializer<boolean>;
                        trailing: false;
                        default: never;
                    };
                    default(value: boolean[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "query";
                            array: true;
                            valueSerializer: ValueSerializer<boolean>;
                            optional: true;
                            default: boolean[];
                            trailing: false;
                        };
                    };
                };
                ofType<TValue_9 = unknown>(valueSerializer?: ValueSerializer<TValue_9>): {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "query";
                        optional: true;
                        valueSerializer: ValueSerializer<TValue_9>;
                        trailing: false;
                        default: never;
                    };
                    default(value: TValue_9[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "query";
                            array: true;
                            valueSerializer: ValueSerializer<TValue_9>;
                            optional: true;
                            default: TValue_9[];
                            trailing: false;
                        };
                    };
                };
            };
            string: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "query";
                    optional: true;
                    valueSerializer: ValueSerializer<string>;
                    trailing: false;
                    default: never;
                };
                default(value: string): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "query";
                        array: false;
                        valueSerializer: ValueSerializer<string>;
                        optional: true;
                        default: string;
                        trailing: false;
                    };
                };
            };
            number: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "query";
                    optional: true;
                    valueSerializer: ValueSerializer<number>;
                    trailing: false;
                    default: never;
                };
                default(value: number): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "query";
                        array: false;
                        valueSerializer: ValueSerializer<number>;
                        optional: true;
                        default: number;
                        trailing: false;
                    };
                };
            };
            boolean: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "query";
                    optional: true;
                    valueSerializer: ValueSerializer<boolean>;
                    trailing: false;
                    default: never;
                };
                default(value: boolean): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "query";
                        array: false;
                        valueSerializer: ValueSerializer<boolean>;
                        optional: true;
                        default: boolean;
                        trailing: false;
                    };
                };
            };
            ofType<TValue_10 = unknown>(valueSerializer?: ValueSerializer<TValue_10>): {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "query";
                    optional: true;
                    valueSerializer: ValueSerializer<TValue_10>;
                    trailing: false;
                    default: never;
                };
                default(value: TValue_10): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "query";
                        array: false;
                        valueSerializer: ValueSerializer<TValue_10>;
                        optional: true;
                        default: TValue_10;
                        trailing: false;
                    };
                };
            };
        };
        string: {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "query";
                optional: false;
                valueSerializer: ValueSerializer<string>;
                trailing: false;
                default: never;
            };
        };
        number: {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "query";
                optional: false;
                valueSerializer: ValueSerializer<number>;
                trailing: false;
                default: never;
            };
        };
        boolean: {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "query";
                optional: false;
                valueSerializer: ValueSerializer<boolean>;
                trailing: false;
                default: never;
            };
        };
        ofType<TValue_11 = unknown>(valueSerializer?: ValueSerializer<TValue_11>): {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "query";
                optional: false;
                valueSerializer: ValueSerializer<TValue_11>;
                trailing: false;
                default: never;
            };
        };
    };
    state: {
        array: {
            string: {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "state";
                    optional: false;
                    valueSerializer: ValueSerializer<string>;
                    trailing: false;
                    default: never;
                };
            };
            number: {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "state";
                    optional: false;
                    valueSerializer: ValueSerializer<number>;
                    trailing: false;
                    default: never;
                };
            };
            boolean: {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "state";
                    optional: false;
                    valueSerializer: ValueSerializer<boolean>;
                    trailing: false;
                    default: never;
                };
            };
            ofType<TValue_12 = unknown>(valueSerializer?: ValueSerializer<TValue_12>): {
                "~internal": {
                    type: "ParamDef";
                    array: true;
                    kind: "state";
                    optional: false;
                    valueSerializer: ValueSerializer<TValue_12>;
                    trailing: false;
                    default: never;
                };
            };
        };
        optional: {
            array: {
                string: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "state";
                        optional: true;
                        valueSerializer: ValueSerializer<string>;
                        trailing: false;
                        default: never;
                    };
                    default(value: string[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "state";
                            array: true;
                            valueSerializer: ValueSerializer<string>;
                            optional: true;
                            default: string[];
                            trailing: false;
                        };
                    };
                };
                number: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "state";
                        optional: true;
                        valueSerializer: ValueSerializer<number>;
                        trailing: false;
                        default: never;
                    };
                    default(value: number[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "state";
                            array: true;
                            valueSerializer: ValueSerializer<number>;
                            optional: true;
                            default: number[];
                            trailing: false;
                        };
                    };
                };
                boolean: {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "state";
                        optional: true;
                        valueSerializer: ValueSerializer<boolean>;
                        trailing: false;
                        default: never;
                    };
                    default(value: boolean[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "state";
                            array: true;
                            valueSerializer: ValueSerializer<boolean>;
                            optional: true;
                            default: boolean[];
                            trailing: false;
                        };
                    };
                };
                ofType<TValue_13 = unknown>(valueSerializer?: ValueSerializer<TValue_13>): {
                    "~internal": {
                        type: "ParamDef";
                        array: true;
                        kind: "state";
                        optional: true;
                        valueSerializer: ValueSerializer<TValue_13>;
                        trailing: false;
                        default: never;
                    };
                    default(value: TValue_13[]): {
                        "~internal": {
                            type: "ParamDef";
                            kind: "state";
                            array: true;
                            valueSerializer: ValueSerializer<TValue_13>;
                            optional: true;
                            default: TValue_13[];
                            trailing: false;
                        };
                    };
                };
            };
            string: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "state";
                    optional: true;
                    valueSerializer: ValueSerializer<string>;
                    trailing: false;
                    default: never;
                };
                default(value: string): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "state";
                        array: false;
                        valueSerializer: ValueSerializer<string>;
                        optional: true;
                        default: string;
                        trailing: false;
                    };
                };
            };
            number: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "state";
                    optional: true;
                    valueSerializer: ValueSerializer<number>;
                    trailing: false;
                    default: never;
                };
                default(value: number): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "state";
                        array: false;
                        valueSerializer: ValueSerializer<number>;
                        optional: true;
                        default: number;
                        trailing: false;
                    };
                };
            };
            boolean: {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "state";
                    optional: true;
                    valueSerializer: ValueSerializer<boolean>;
                    trailing: false;
                    default: never;
                };
                default(value: boolean): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "state";
                        array: false;
                        valueSerializer: ValueSerializer<boolean>;
                        optional: true;
                        default: boolean;
                        trailing: false;
                    };
                };
            };
            ofType<TValue_14 = unknown>(valueSerializer?: ValueSerializer<TValue_14>): {
                "~internal": {
                    type: "ParamDef";
                    array: false;
                    kind: "state";
                    optional: true;
                    valueSerializer: ValueSerializer<TValue_14>;
                    trailing: false;
                    default: never;
                };
                default(value: TValue_14): {
                    "~internal": {
                        type: "ParamDef";
                        kind: "state";
                        array: false;
                        valueSerializer: ValueSerializer<TValue_14>;
                        optional: true;
                        default: TValue_14;
                        trailing: false;
                    };
                };
            };
        };
        string: {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "state";
                optional: false;
                valueSerializer: ValueSerializer<string>;
                trailing: false;
                default: never;
            };
        };
        number: {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "state";
                optional: false;
                valueSerializer: ValueSerializer<number>;
                trailing: false;
                default: never;
            };
        };
        boolean: {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "state";
                optional: false;
                valueSerializer: ValueSerializer<boolean>;
                trailing: false;
                default: never;
            };
        };
        ofType<TValue_15 = unknown>(valueSerializer?: ValueSerializer<TValue_15>): {
            "~internal": {
                type: "ParamDef";
                array: false;
                kind: "state";
                optional: false;
                valueSerializer: ValueSerializer<TValue_15>;
                trailing: false;
                default: never;
            };
        };
    };
};

declare function createGroup<T extends any[]>(groupItems: T): RouteGroup<T>;

declare function preventDefaultLinkClickBehavior(event?: any): boolean;

export { Link, QueryStringSerializer, GetRoute as Route, RouterOpts, SessionOpts, ValueSerializer, createGroup, createRouter, defineRoute, noMatch, param, preventDefaultLinkClickBehavior };
