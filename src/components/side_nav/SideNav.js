import React from 'react'
import WhiteLogo from '../../assets/img/ProflowLogoWhite.svg'
import BurgerButton from '../../assets/img/BurgerButton.svg'
import LoadingLink from '../../assets/img/LoadingLink.svg'
import LoadingLinkShort from '../../assets/img/LoadingLinkShort.svg'
import LoadingTeamMemberLink from '../../assets/img/LoadingTeamMemberLink.svg'

import { SideNavLinks } from '../side_nav_links/SideNavLinks'

export const SideNav = ({ routes }) => {
    return (
        <div className="inline-block h-screen overflow-y-scroll bg-primaryred" style={{ width: '21rem', maxWidth: '21rem' }}>
            <div className="py-10 mx-auto w-64 flex">
                <div className="w-1/8 text-right">
                    <button className="py-0">
                        <img src={BurgerButton} className="" alt="Menu Button" />
                    </button>
                </div>
                <div className="flex-grow pl-8">
                    <img src={WhiteLogo} className="h-10" alt="Proflow logo" />
                </div>
            </div>

            {window.location.pathname === '/setup-team' && <div className="py-10 mx-auto w-64">
                <img src={LoadingLink} className="pb-10" alt="Link Loading" />
                <img src={LoadingLink} className="pb-10" alt="Link Loading" />
                <img src={LoadingLink} className="pb-24" alt="Link Loading" />
                <img src={LoadingLinkShort} className="pb-6" alt="Link Loading" />
                <img src={LoadingTeamMemberLink} className="pb-10" alt="Team members link loading " />
                <img src={LoadingLink} className="" alt="Link Loading" />
            </div>
            }
            {window.location.pathname !== '/setup-team' && <SideNavLinks routes={routes} />}

        </div>
    )
}