import React from "react";
import {Divider, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const FooterText = ({children}: {children: React.ReactNode}) => (
    <Typography variant="body2" align="center" color="textSecondary">
        {children}
    </Typography>
);

const I18nSelector = () => {
    const {i18n} = useTranslation();
    const [locale, setLocale] = React.useState("en");

    const onLocaleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        setLocale(newLocale);
        await i18n.changeLanguage(newLocale);
    };

    return (
        <select
            value={locale}
            onChange={onLocaleChange}
            className="ml-auto bg-transparent border-none mb-1 font-display font-light"
        >
            <option value="vi">VI</option>
            <option value="en">EN</option>
        </select>
    );
};

const AppFooter = () => {
    const {t} = useTranslation();

    return (
        <footer className="my-2 ml-2">
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                className="items-center"
            >
                <Link to="/gallery" className="no-underline">
                    <FooterText>{t("gallery.title")}</FooterText>
                </Link>
                <Link
                    to="/terms_and_conditions.txt"
                    target="_blank"
                    className="no-underline"
                >
                    <FooterText>{t("footer.term")}</FooterText>
                </Link>
                <Link
                    to="/privacy_policy.txt"
                    target="_blank"
                    className="no-underline"
                >
                    <FooterText>{t("footer.privacy")}</FooterText>
                </Link>
                <a
                    href="https://status.draw-with.trinhdvt.tech/"
                    target="_blank"
                    className="no-underline"
                    rel="noreferrer"
                >
                    <FooterText>{t("footer.status")}</FooterText>
                </a>
                <I18nSelector />
            </Stack>
        </footer>
    );
};

export default AppFooter;
