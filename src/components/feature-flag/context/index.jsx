import { createContext, useEffect, useState } from "react";
import featureFlagsDataServiceCall from "../data";

export const FeatureFlagsContext = createContext(null);

export default function FeatureFlagGlobalState({ children }) {

    const [loading, setLoading] = useState(false);
    const [enabledFlags, setEnabledFlags] = useState({});

    async function fetchFeatureFlags() {

        try {

            setLoading(true);

            const response = await featureFlagsDataServiceCall();

            // console.log(response);
            setEnabledFlags(response);

            setLoading(false);

        } catch(err) {
            setLoading(false);
            throw new Error(err);
        }

    }

    useEffect(() => {
        fetchFeatureFlags();
    }, []);

    return <FeatureFlagsContext.Provider value={{ loading, enabledFlags }}>
        {children}
    </FeatureFlagsContext.Provider>;
}