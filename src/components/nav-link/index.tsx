import { FC, ReactNode } from 'react';
import { ClassNames } from 'shared/utils';

interface NavLinkProps {
  children: ReactNode;
  href: string,
  exact?: boolean,
  className?: string,
  isDisable?: boolean
}

export const useLink = (href: string, exact = false) => {
  // const { pathname } = useRouter();
  // const isActive = exact ? pathname === href : pathname.startsWith(href);
  return {
    // isActive,
  }
}

export const NavLink: FC<NavLinkProps> = (props) => {
  // const { isActive } = useLink(props.href, props.exact);

  return (
    <a href={props.href}>
      <a className={ClassNames({
        [props.className as string]: !!props.className,
        // active: isActive,
        disable: props.isDisable
      })}>
        {props.children}
      </a>
    </a>
  )
}

NavLink.defaultProps = {
  exact: false,
  isDisable: false
};