// from: github.com/AndrewLester/svelte-animated-details/blob/main/README.md
import { DEV } from 'esm-env';

const defaultOptions = {
    duration: 400,
    easing: 'ease-out'
};

export default function animatedDetails(element, options = defaultOptions) {
    const summary = element.querySelector('summary');
    if (!summary) return {};

    options = {
        ...defaultOptions,
        ...options
    };

    const { overflow, writingMode } = getComputedStyle(element);

    if (DEV && overflow !== 'hidden' && overflow !== 'clip') {
        console.warn(
            'Using animated details on a details element which does not use overflow hidden or clip.'
        );
    }

    let transitioning = false;

    const animatePanel = (opening) => {
        transitioning = true;

        if (opening) {
            element.open = true;
        }

        element.dispatchEvent(
            new CustomEvent(opening ? 'openstart' : 'closestart', { detail: element })
        );

        const widthChanges = writingMode.startsWith('vertical') || writingMode.startsWith('tb');

        const blockSizeKeyframes = [
            `${summary[widthChanges ? 'offsetWidth' : 'offsetHeight']}px`,
            `${element[widthChanges ? 'clientWidth' : 'clientHeight']}px`
        ];

        if (!opening) {
            blockSizeKeyframes.reverse();
        }

        const animation = element.animate(
            {
                blockSize: blockSizeKeyframes
            },
            options
        );

        animation.oncancel =
            animation.onfinish =
            animation.onremove =
                () => {
                    element.dispatchEvent(
                        new CustomEvent(opening ? 'openend' : 'closeend', { detail: element })
                    );

                    if (!opening) {
                        element.open = false;
                    }

                    transitioning = false;
                };
    };

    const onClick = (e) => {
        e.preventDefault();

        if (transitioning) return;

        animatePanel(!element.open);
    };

    const onMutate = (mutationList) => {
        for (const mutation of mutationList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
                if (transitioning) return;

                if (element.open) {
                    animatePanel(true);
                }
            }
        }
    };

    const observer = new MutationObserver(onMutate);
    observer.observe(element, { attributes: true });
    summary.addEventListener('click', onClick);

    return {
        destroy() {
            observer.disconnect();
            summary.removeEventListener('click', onClick);
        },
        update(newOptions = defaultOptions) {
            options = {
                ...options,
                ...newOptions
            };
        }
    };
}
