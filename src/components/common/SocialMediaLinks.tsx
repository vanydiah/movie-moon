import React, { useRef } from "react";
import { SocialLinks } from "../../services/MediaType";
import { useTooltips } from "../../utilities";

const SocialMediaLinks: React.FC<{ links: SocialLinks; color?: string }> = (
  props
) => {
  useTooltips();
  const links = props.links;
  let twitterLinks, facebookLinks, instagramLinks, linkedinLinks, githubLinks;
  if (links) {
    if (links.twitter_id) {
      twitterLinks = (
        <ToolTipLinks linkId={links.twitter_id} website="twitter" />
      );
    }
    if (links.facebook_id) {
      facebookLinks = (
        <ToolTipLinks linkId={links.facebook_id} website="facebook" />
      );
    }
    if (links.instagram_id) {
      instagramLinks = (
        <ToolTipLinks linkId={links.instagram_id} website="instagram" />
      );
    }
    if (links.linkedin_id) {
      linkedinLinks = (
        <ToolTipLinks linkId={links.linkedin_id} website="linkedin" />
      );
    }
    if (links.github_id) {
      githubLinks = <ToolTipLinks linkId={links.github_id} website="github" />;
    }
  }
  return (
    <div
      className={`d-flex justify-content-center justify-content-md-start justify-content-lg-start ${
        props.color ? props.color : ""
      }`}
    >
      {twitterLinks}
      {instagramLinks}
      {facebookLinks}
      {githubLinks}
      {linkedinLinks}
    </div>
  );
};

export const ToolTipLinks: React.FC<{ linkId: string; website: string }> = (
  props
) => {
  const twitterRef = useRef<HTMLAnchorElement>(null);
  let title = "Visit ";
  let linkUrl = "";
  const wb = props.website ? props.website.toLowerCase() : "";
  switch (props.website) {
    case "twitter":
      linkUrl = `https://www.twitter.com/${props.linkId}`;
      title += wb.charAt(0).toUpperCase() + wb.slice(1);
      break;

    case "instagram":
      linkUrl = `https://www.instagram.com/${props.linkId}`;
      title += wb.charAt(0).toUpperCase() + wb.slice(1);
      break;

    case "facebook":
      linkUrl = `https://www.facebook.com/${props.linkId}`;
      title += wb.charAt(0).toUpperCase() + wb.slice(1);
      break;

    case "linkedin":
      linkUrl = `https://www.linkedin.com/in/${props.linkId}`;
      title += wb.charAt(0).toUpperCase() + wb.slice(1);
      break;

    case "github":
      linkUrl = `https://github.com/${props.linkId}`;
      title += wb.charAt(0).toUpperCase() + wb.slice(1);
      break;

    default:
      break;
  }

  return (
    <div className="px-2">
      <a
        style={{ color: "initial" }}
        href={linkUrl}
        target="_blank"
        ref={twitterRef}
        className="fs-3"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={title}
      >
        <i className={`fa-brands fa-${props.website}`}></i>
      </a>
    </div>
  );
};

export default SocialMediaLinks;
