import React from "react";
import {
    Avatar,
    Chip,
    ChipProps,
    Grid,
    GridProps,
    Typography,
} from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import i18n from "../../../i18n/config";
import {IPlayer} from "../../../api/@types/User";
import styles from "../../../assets/styles/Player.module.scss";
import TopTooltip from "../../../components/TopTooltip";

const RankingBgColor = ["bg-[#FDAC53]", "bg-[#9BB7D4]", "bg-[#0072B5]"];

const SmallChip = (props: ChipProps) => (
    <Chip variant="filled" size="small" {...props} />
);

class Player extends React.Component<IPlayer & GridProps> {
    render() {
        const {name, point, topk, isHost, isMe, avatar, ...others} = this.props;

        const PlayerBadge = () => {
            if (topk) {
                const bgColor = RankingBgColor[topk - 1];
                return <SmallChip label={`No.${topk}`} className={bgColor} />;
            }
            if (isHost)
                return <SmallChip label="Host" className="bg-cyan-500" />;
            return <></>;
        };

        const PlayerAvatar = () => (
            <Avatar src={avatar} className="w-[45px] h-[45px]" />
        );

        return (
            <Grid
                container
                alignItems="center"
                className={styles.playerCard}
                {...others}
            >
                <Grid
                    item
                    md={3}
                    xs={3}
                    className="flex flex-col items-center pr-2.5"
                >
                    <PlayerAvatar />
                    <PlayerBadge />
                </Grid>

                <Grid item md={9} xs={9} className="flex flex-col">
                    <div className="flex items-center">
                        {isMe && <HowToRegIcon color="primary" />}
                        <TopTooltip title={name}>
                            <Typography
                                className="font-bold max-w-[140px]"
                                noWrap={true}
                            >
                                {name}
                            </Typography>
                        </TopTooltip>
                    </div>
                    <Typography>
                        <span className="font-bold">{point}</span>
                        {i18n.t("game_play.point") as string}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

const PlayerSkeleton = () => (
    <Grid container alignItems="center" className={styles.playerCard}>
        <Grid item md={3} xs={3} className="pr-2.5">
            <Avatar className="avatar" />
        </Grid>
        <Grid item md={9} xs={9}>
            <Typography className="font-thin">...</Typography>
        </Grid>
    </Grid>
);

export default Player;
export {PlayerSkeleton, SmallChip, RankingBgColor};
