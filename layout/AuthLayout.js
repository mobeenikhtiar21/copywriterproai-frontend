import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Processing from "@/pages/processing";
import Layout from "./Layout";
import { useUser } from "@/hooks";
import { USER_DEFAULT_PATH } from "@/appconstants";

const AuthLayout = ({
                        children,
                        title,
                        description,
                        otherSEO,
                        additionalMeta,
                    }) => {
    const router = useRouter();
    const { isAuth, isRehydrated, userInfo } = useUser();
    const [hasNavigated, setHasNavigated] = useState(false);
    const { hasCompletedOnboarding = true } = userInfo;

    useEffect(() => {
        if (isAuth && isRehydrated && !hasNavigated) {
            if (hasCompletedOnboarding) {
                router.replace(USER_DEFAULT_PATH);
            } else {
                router.replace("/app/onboarding");
            }
            setHasNavigated(true);
        }
    }, [isAuth, isRehydrated, hasCompletedOnboarding, hasNavigated, router]);

    if (isAuth && isRehydrated) {
        return <Processing color="#000" />;
    }

    return (
        <Layout
            title={title}
            description={description}
            otherSEO={otherSEO}
            additionalMeta={additionalMeta}
        >
            {children}
        </Layout>
    );
};

export default AuthLayout;
